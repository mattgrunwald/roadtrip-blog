import styles from './styles.module.css'
export default function Gallery2() {
  return (
    <section className={styles.carousel} aria-label="Gallery">
      <ol className={styles.carousel__viewport}>
        <li
          id="carousel__slide1"
          tabIndex={0}
          className={styles.carousel__slide}
        >
          <div className={styles.carousel__snapper}>
            <a href="#carousel__slide4" className={styles.carousel__prev}>
              Go to last slide
            </a>
            <a href="#carousel__slide2" className={styles.carousel__next}>
              Go to next slide
            </a>
          </div>
        </li>
        <li
          id="carousel__slide2"
          tabIndex={0}
          className={styles.carousel__slide}
        >
          <div className={styles.carousel__snapper}></div>
          <a href="#carousel__slide1" className={styles.carousel__prev}>
            Go to previous slide
          </a>
          <a href="#carousel__slide3" className={styles.carousel__next}>
            Go to next slide
          </a>
        </li>
        <li
          id="carousel__slide3"
          tabIndex={0}
          className={styles.carousel__slide}
        >
          <div className={styles.carousel__snapper}></div>
          <a href="#carousel__slide2" className={styles.carousel__prev}>
            Go to previous slide
          </a>
          <a href="#carousel__slide4" className={styles.carousel__next}>
            Go to next slide
          </a>
        </li>
        <li
          id="carousel__slide4"
          tabIndex={0}
          className={styles.carousel__slide}
        >
          <div className={styles.carousel__snapper}></div>
          <a href="#carousel__slide3" className={styles.carousel__prev}>
            Go to previous slide
          </a>
          <a href="#carousel__slide1" className={styles.carousel__next}>
            Go to first slide
          </a>
        </li>
      </ol>
      <aside className={styles.carousel__navigation}>
        <ol className={styles.carousel__navigation_list}>
          <li className={styles.carousel__navigation_item}>
            <a
              href="#carousel__slide1"
              className={styles.carousel__navigation_button}
            >
              Go to slide 1
            </a>
          </li>
          <li className={styles.carousel__navigation_item}>
            <a
              href="#carousel__slide2"
              className={styles.carousel__navigation_button}
            >
              Go to slide 2
            </a>
          </li>
          <li className={styles.carousel__navigation_item}>
            <a
              href="#carousel__slide3"
              className={styles.carousel__navigation_button}
            >
              Go to slide 3
            </a>
          </li>
          <li className={styles.carousel__navigation_item}>
            <a
              href="#carousel__slide4"
              className={styles.carousel__navigation_button}
            >
              Go to slide 4
            </a>
          </li>
        </ol>
      </aside>
    </section>
  )
}
