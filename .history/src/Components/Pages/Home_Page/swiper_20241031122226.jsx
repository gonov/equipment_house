import { useState } from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { smItem } from '../../../../data'
import SMItem from '../SMItem/SMItem'

import styles from './SupportMeasures.module.css'

function SupportMeasures() {
  const [swiper, setSwiper] = useState()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className={styles.support_measures}>
      <p className={styles.sm_t} style={{ textTransform: 'uppercase' }}>
        Меры поддержки
      </p>
      <Swiper
        className={styles.sliderBox}
        spaceBetween={70}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          1299: {
            slidesPerView: 4,
            spaceBetween: 70
          }
        }}
        direction='horizontal'
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
        onSwiper={setSwiper}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      >
        {smItem.map((item, index) => (
          <SwiperSlide key={index}>
            <SMItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiper_buttons}>
        <img
          src='/images/prev_slide.png'
          alt=''
          onClick={() => swiper.slidePrev()}
        />
        <img
          src='/images/next_slide.png'
          alt=''
          onClick={() => swiper.slideNext()}
        />
      </div>
    </section>
  )
}

export default SupportMeasures