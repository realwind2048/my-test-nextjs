'use client'

import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { Suspense } from 'react'
import { getHeartBibleVerse } from '@/app/lib/firebase/RealtimeDatabase'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  const params = useParams();
  const heartBibleVerseId = Number(params.heartBibleVerseId);
  console.log('heartBibleVerseId:', heartBibleVerseId);

  const searchParams = useSearchParams()
  const imageSrc = getRandomBackgroundImageSrcFromBgId(searchParams.get('bg'))

  interface VerseData {
    verseKo: string;
    bookKo: string;
    indexKo: string;
  }

  const [data, setData] = useState<VerseData | null>(null)

  useEffect(() => {
    console.log('Page useEffect');
    getHeartBibleVerse(heartBibleVerseId)
    .then((data) => {
      console.log('Verse 0:', data);
      setData(data as VerseData);
    })
  }, [heartBibleVerseId])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      { data ? 
        <VerseCardForProp 
          verseString={data.verseKo} 
          indexString={`${data.bookKo} ${data.indexKo}`} 
          imageSrc={imageSrc}
        /> : <div>Loading...</div>
      }
    </Suspense>
  )
}