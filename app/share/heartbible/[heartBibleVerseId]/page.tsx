import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
import { getHeartBibleVerse, getRandomHeartBibleVerse, getShareUrl } from '@/app/domain/usecase/HeartBibleVerseUseCase'
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default async function Page({
  params, 
  searchParams
}: {
  params: Promise<{ heartBibleVerseId: number }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { heartBibleVerseId } = await params;
  const heartBibleVerseIdNumber: number = Number(heartBibleVerseId);
  console.log('heartBibleVerseIdNumber:', heartBibleVerseIdNumber);

  const { bg, pt }: { bg?: string; pt?: string } = await searchParams;
  const bgId: string = bg || String(getRandomBackgroundId());
  const imageSrc = getRandomBackgroundImageSrcFromBgId(bgId);
  const particlesId = pt || '';
  const shareUrl = getShareUrl(heartBibleVerseIdNumber, bgId, particlesId);

  interface VerseData {
    verseKo: string;
    bookKo: string;
    indexKo: string;
  }

  let data = await getHeartBibleVerse(heartBibleVerseIdNumber) as VerseData;
  console.log('data:', data);
  console.log('shareUrl:', shareUrl);
  return (
      <VerseCardForProp 
        verseString={data.verseKo} 
        indexString={`${data.bookKo} ${data.indexKo}`} 
        imageSrc={imageSrc}
        particlesId={particlesId}
        shareUrl={shareUrl}
      />
  )
}