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
  team: string;
  answer: string;
  position: string;
}) => {
  const { refresh } = useRouter();
  const answerInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<
    'bg-red-500' | 'bg-green-500' | 'bg-white'
  >('bg-white');
  const checkAnswer = () => {
    if (answerInput.current?.value.toLowerCase() === answer.toLowerCase()) {
      setStatus('bg-green-500');
    } else {
      setStatus('bg-red-500');
    }
  };
  const reload = () => {
    setStatus('bg-white');
    if (answerInput.current) {
      answerInput.current.value = '';
    }
    refresh();
  };

  return (
    <Card
      className={`${status} transition-colors flex items-center justify-around flex-col w-[350px] h-[350px]`}
    >
      <CardHeader>
        <CardTitle>{team}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{position}</CardTitle>
        <Input className="w-[200px]" ref={answerInput} />
      </CardContent>
      <div className="flex justify-around w-full">
        <Button onClick={checkAnswer}>Submit</Button>
        <Button variant="outline" onClick={reload}>
          Next
        </Button>
      </div>
      <div className="h-4">
        {status === 'bg-green-500' ? 'Correct!' : null}
        {status === 'bg-red-500' ? `Wrong! The player is ${answer}` : null}
      </div>
    </Card>
  );
};
