import Question from '@/components/Question';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-zinc-200">
      <div className="h-16 w-full bg-black absolute top-0 flex justify-between">
        <h1 className="text-white font-extrabold flex items-center px-2">
          {`YDKB - You Don't Know Ball`}
        </h1>
        <a className="h-full px-2 flex items-center" href="https://shipsey.io">
          <Image
            className="rounded-full object-cover h-10 w-10"
            alt="steve shipsey"
            src="https://gravatar.com/avatar/ef952dde9c30c10e47627aff7a13e6a24b09d56d4e632c5df6d7650fee28c732"
            width="48"
            height="48"
          />
        </a>
      </div>
      <Question />
    </div>
  );
}
