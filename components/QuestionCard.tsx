'use client';

import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const QuestionCard = ({
  team,
  position,
  answer,
}: {
  team: { name: string; color: string; accent?: boolean };
  answer: string;
  position: string;
}) => {
  const { refresh } = useRouter();
  const answerInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<
    'bg-red-700' | 'bg-green-700' | 'bg-white'
  >('bg-white');
  const [streak, setStreak] = useState(0);

  const checkAnswer = () => {
    const formattedInput = answerInput.current?.value
      .toLowerCase()
      .replace(/[^a-z]/gi, '');
    const formattedAnswer = answer.toLowerCase().replace(/[^a-z]/gi, '');
    if (formattedInput === formattedAnswer) {
      setStatus('bg-green-700');
    } else {
      setStatus('bg-red-700');
    }
  };
  const reload = () => {
    if (status !== 'bg-green-700') {
      setStreak(0);
    } else {
      setStreak((s) => s + 1);
    }
    setStatus('bg-white');
    if (answerInput.current) {
      answerInput.current.value = '';
    }
    refresh();
  };

  return (
    <Card
      className={`${status} transition-colors flex items-center justify-between flex-col w-[350px] h-[350px]`}
      style={{
        backgroundColor: status === 'bg-white' ? team.color : undefined,
        color: team.accent ? '#e4e4e7' : '#27272a',
      }}
    >
      <CardHeader className="flex flex-col items-center gap-4 h-[117px]">
        <CardTitle>{team.name}</CardTitle>
        <CardTitle>{position}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 h-[58px] relative">
        <Input
          className="w-[300px] h-full text-black absolute text-xl"
          ref={answerInput}
        />
      </CardContent>
      <CardContent className="flex w-full gap-2 flex-col justify-end h-[175px]">
        {status === 'bg-white' ? (
          <Button onClick={checkAnswer} className="bg-zinc-800">
            Submit
          </Button>
        ) : null}
        <Button variant="outline" className="text-black" onClick={reload}>
          {status === 'bg-white' ? 'Skip' : null}
          {status === 'bg-red-700' ? 'Restart' : null}
          {status === 'bg-green-700' ? 'Next' : null}
        </Button>
        {status === 'bg-green-700' || status === 'bg-red-700' ? (
          <div className="h-4 font-bold flex justify-center items-center">
            {status === 'bg-green-700' ? 'Correct!' : null}
            {status === 'bg-red-700' ? `Wrong! It's ${answer}` : null}
          </div>
        ) : null}
        {streak > 0 ? (
          <div className="flex justify-end items-center font-bold">
            Streak: {streak}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
