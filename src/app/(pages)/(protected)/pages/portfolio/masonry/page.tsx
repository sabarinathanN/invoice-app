import { Metadata } from 'next'
import Hero from './Hero'
import Gallery from './Gallery'
import Footer from '@/components/common/Footer'

//data
import { galleryItems } from './data'

export const metadata: Metadata = {
  title: 'Portfolio Masonary',
}

const PortfolioMasonry = () => {
  return (
    <>
      <div>
        <Hero />

        <Gallery galleryItems={galleryItems} />

        <Footer />
      </div>
    </>
  )
}

export default PortfolioMasonry
