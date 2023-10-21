'use server';

import * as cheerio from 'cheerio';
import { QuestionCard } from './QuestionCard';

const teams: { [key: string]: string } = {
  9017: 'Arizona Cardinals',
  9024: 'Atlanta Falcons',
  9030: 'Baltimore Ravens',
  9000: 'Buffalo Bills',
  9028: 'Carolina Panthers',
  9019: 'Chicago Bears',
  9005: 'Cincinnati Bengals',
  9006: 'Cleveland Browns',
  9014: 'Dallas Cowboys',
  9009: 'Denver Broncos',
  9020: 'Detroit Lions',
  9021: 'Green Bay Packers',
  9031: 'Houston Texans',
  9001: 'Indianapolis Colts',
  9029: 'Jacksonville Jaguars',
  9010: 'Kansas City Chiefs',
  9033: 'Los Angeles Chargers',
  9032: 'Los Angeles Rams',
  9011: 'Las Vegas Raiders',
  9002: 'Miami Dolphins',
  9022: 'Minnesota Vikings',
  9003: 'New England Patriots',
  9026: 'New Orleans Saints',
  9015: 'New York Giants',
  9004: 'New York Jets',
  9016: 'Philadelphia Eagles',
  9008: 'Pittsburgh Steelers',
  9013: 'Seattle Seahawks',
  9027: 'San Francisco 49ers',
  9023: 'Tampa Bay Buccaneers',
  9007: 'Tennessee Titans',
  9018: 'Washington Commanders',
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
  const teamName = teams[teamId];
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
      team={teamName}
      answer={randomPlayer[1].trim()}
    />
  );
}
