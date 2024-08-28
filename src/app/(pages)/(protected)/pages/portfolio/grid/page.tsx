import { Metadata } from 'next'
import Hero from './Hero'
import Footer from '@/components/common/Footer'

//data
import { galleryItems } from './data'
import Gallery from './Gallery'

export const metadata: Metadata = {
  title: 'Portfolio Grid',
}
const PortfolioGrid = () => {
  return (
    <>
      <Hero />

      <Gallery galleryItems={galleryItems} />

      <Footer />
    </>
  )
}

export default PortfolioGrid
