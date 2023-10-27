'use server';

import * as cheerio from 'cheerio';
import { QuestionCard } from './QuestionCard';

const teams: {
  [key: string]: { name: string; color: string; accent?: boolean };
} = {
  9017: { name: 'Arizona Cardinals', color: '#97233F', accent: true },
  9024: { name: 'Atlanta Falcons', color: '#A71930' },
  9030: { name: 'Baltimore Ravens', color: '#241773', accent: true },
  9000: { name: 'Buffalo Bills', color: '#00338D', accent: true },
  9028: { name: 'Carolina Panthers', color: '#0085CA' },
  9019: { name: 'Chicago Bears', color: '#C83803', accent: true },
  9005: { name: 'Cincinnati Bengals', color: '#FB4F14' },
  9006: { name: 'Cleveland Browns', color: '#311D00', accent: true },
  9014: { name: 'Dallas Cowboys', color: '#041E42', accent: true },
  9009: { name: 'Denver Broncos', color: '#FB4F14' },
  9020: { name: 'Detroit Lions', color: '#0076B6' },
  9021: { name: 'Green Bay Packers', color: '#203731', accent: true },
  9031: { name: 'Houston Texans', color: '#03202F', accent: true },
  9001: { name: 'Indianapolis Colts', color: '#002C5F', accent: true },
  9029: { name: 'Jacksonville Jaguars', color: '#101820', accent: true },
  9010: { name: 'Kansas City Chiefs', color: '#E31837' },
  9033: { name: 'Los Angeles Chargers', color: '#0080C6' },
  9032: { name: 'Los Angeles Rams', color: '#FFA300' },
  9011: { name: 'Las Vegas Raiders', color: '#000000', accent: true },
  9002: { name: 'Miami Dolphins', color: '#008E97' },
  9022: { name: 'Minnesota Vikings', color: '#4F2683', accent: true },
  9003: { name: 'New England Patriots', color: '#002244', accent: true },
  9026: { name: 'New Orleans Saints', color: '#D3BC8D' },
  9015: { name: 'New York Giants', color: '#0B2265', accent: true },
  9004: { name: 'New York Jets', color: '#125740', accent: true },
  9016: { name: 'Philadelphia Eagles', color: '#004C54', accent: true },
  9008: { name: 'Pittsburgh Steelers', color: '#FFB612' },
  9013: { name: 'Seattle Seahawks', color: '#002244', accent: true },
  9027: { name: 'San Francisco 49ers', color: '#AA0000', accent: true },
  9023: { name: 'Tampa Bay Buccaneers', color: '#D50A0A', accent: true },
  9007: { name: 'Tennessee Titans', color: '#0C2340', accent: true },
  9018: { name: 'Washington Commanders', color: '#5A1414', accent: true },
};

const positions = [
  'QB1',
  'QB2',
  'RB1',
  'RB2',
  'RB3',
  'WR1',
  'WR2',
  'WR3',
  'TE1',
  'TE2',
  'K1',
];

const fetchTeam = async (teamId: string) => {
  const res = await fetch(
    `https://www.fftoday.com/nfl/depth.php?TeamID=${teamId}}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.text();
};

export default async function Question() {
  const teamIds = Object.keys(teams);
  const teamId = teamIds[Math.floor(Math.random() * teamIds.length)];
  const team = teams[teamId];
  const v = await fetchTeam(teamId);
  const $ = cheerio.load(v);
  const table = $('table');
  let tableData: string[][] = [];
  table.find('tr').each((i, row) => {
    const rowData: string[] = [];
    $(row)
      .find('td, th')
      .each((j, cell) => {
        rowData[j] = $(cell).text();
      });
    tableData.push(rowData);
  });
  const s = tableData.findIndex((t) => t[0].trim() === 'Offense');
  const e = tableData.findIndex((t) => t[0].trim() === 'Note:');
  tableData.splice(e);
  tableData = tableData.slice(s + 2);
  const teamData: { [key: string]: string } = tableData.reduce(
    (acc, row) => ({ ...acc, ...{ [row[1]]: row[2] } }),
    {}
  );
  const players = Object.entries(teamData).filter((player) =>
    positions.includes(player[0])
  );

  const randomPlayer = players[Math.floor(Math.random() * players.length)];
  let key = 1;

  return (
    <QuestionCard
      key={key}
      position={randomPlayer[0]}
      team={team}
      answer={randomPlayer[1].trim()}
    />
  );
}
