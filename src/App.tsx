import { useEffect, useState } from 'react'
import collectionKnitwear from './assets/collection-knitwear.jpg'
import collectionRacks from './assets/collection-racks.jpg'
import collectionStreetwear from './assets/collection-streetwear.jpg'
import heroWholesale from './assets/hero-wholesale.jpg'
import mikiJapanLogo from './assets/miki-japan-logo.jpg'
import { getApiHealth } from './services/promotionService'

type Collection = {
  image: string
  title: string
  description: string
  tag: string
}

type PackageDeal = {
  title: string
  quantity: string
  detail: string
}

type ApiStatus = 'checking' | 'ready' | 'offline'

const highlights = [
  'คัดเกรดก่อนส่ง',
  'เหมาล็อตได้',
  'พร้อมรูปทำโพสต์',
]

const collections: Collection[] = [
  {
    image: collectionKnitwear,
    title: 'เสื้อยืดและสเวตเตอร์',
    description: 'โทนใส่ง่าย เหมาะกับร้านไลฟ์และร้านออนไลน์',
    tag: 'ล็อตขายไว',
  },
  {
    image: collectionRacks,
    title: 'เชิ้ต เดรส และแจ็กเก็ต',
    description: 'คละไซซ์ คละสี จัดราวพร้อมถ่ายลงเพจ',
    tag: 'คละแบบ',
  },
  {
    image: collectionStreetwear,
    title: 'สตรีทแวร์และแฟชั่นวินเทจ',
    description: 'ชิ้นเด่นสำหรับทำโปรรายสัปดาห์และหน้าร้าน',
    tag: 'กำไรดี',
  },
]

const packageDeals: PackageDeal[] = [
  {
    title: 'เริ่มต้นร้านใหม่',
    quantity: '50 ชิ้น',
    detail: 'คละหมวดพื้นฐานสำหรับทดลองตลาดและทำคอนเทนต์',
  },
  {
    title: 'ไลฟ์ขายประจำ',
    quantity: '120 ชิ้น',
    detail: 'เพิ่มชิ้นไฮไลต์และสีขายง่ายสำหรับรอบไลฟ์ต่อเนื่อง',
  },
  {
    title: 'เหมาราวหน้าร้าน',
    quantity: '300+ ชิ้น',
    detail: 'จัดล็อตใหญ่พร้อมแยกหมวดสำหรับเติมสต็อกเร็ว',
  },
]

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')

  useEffect(() => {
    let isMounted = true

    getApiHealth()
      .then((health) => {
        if (isMounted) {
          setApiStatus(health.status === 'ok' ? 'ready' : 'offline')
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiStatus('offline')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const apiStatusText =
    apiStatus === 'checking'
      ? 'กำลังเชื่อมต่อ API'
      : apiStatus === 'ready'
        ? 'API พร้อมใช้งาน'
        : 'ติดต่อผ่าน LINE ได้ตามปกติ'

  return (
    <main className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/15 bg-[color:var(--color-ink)]/72 px-4 pt-[calc(env(safe-area-inset-top)+10px)] backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4">
          <a className="flex min-w-0 items-center gap-3" href="#top">
            <img
              alt="Miki Japan"
              className="size-10 shrink-0 rounded-full border border-white/30 object-cover"
              height="40"
              src={mikiJapanLogo}
              width="40"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white/68">
                Miki Japan
              </p>
              <p className="truncate text-sm font-semibold text-white">
                Promotion
              </p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/78 sm:flex">
            <a className="transition hover:text-white" href="#collections">
              ล็อตสินค้า
            </a>
            <a className="transition hover:text-white" href="#packages">
              แพ็กค้าส่ง
            </a>
            <a className="transition hover:text-white" href="#contact">
              ติดต่อ
            </a>
          </nav>
        </div>
      </header>

      <section
        className="relative isolate min-h-[92svh] overflow-hidden bg-[var(--color-ink)]"
        id="top"
      >
        <img
          alt="ราวเสื้อผ้าค้าส่งของ Miki Japan"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={heroWholesale}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(49,36,29,0.9)_0%,rgba(49,36,29,0.62)_48%,rgba(49,36,29,0.18)_100%)]" />

        <div className="mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col justify-between px-4 pb-9 pt-[calc(env(safe-area-inset-top)+104px)] sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="mb-4 inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-1 text-sm font-semibold text-white/82 backdrop-blur">
              เสื้อผ้าญี่ปุ่นคัดเกรดสำหรับร้านค้า
            </p>
            <h1 className="max-w-2xl text-3xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl">
              โปรโมชันเสื้อผ้า
              <span className="block">ค้าส่ง พร้อมขายทั้ง</span>
              <span className="block">ออนไลน์และหน้าร้าน</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              รวมล็อตเสื้อยืด เชิ้ต เดรส แจ็กเก็ต และแฟชั่นวินเทจ คัดภาพสินค้าให้ดูชัด จัดหมวดให้เลือกง่าย และเหมาะกับร้านที่ต้องการเติมสต็อกเร็ว
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                className="flex min-h-12 items-center justify-center rounded-md bg-[var(--color-surface)] px-5 text-base font-semibold text-[var(--color-primary-dark)] shadow-sm transition hover:bg-white"
                href="#collections"
              >
                ดูล็อตแนะนำ
              </a>
              <a
                className="flex min-h-12 items-center justify-center rounded-md border border-white/28 bg-white/10 px-5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/18"
                href="#contact"
              >
                ติดต่อสั่งค้าส่ง
              </a>
            </div>
          </div>

          <div className="grid gap-2 pt-8 sm:max-w-3xl sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                className="rounded-md border border-white/16 bg-white/10 px-4 py-3 text-sm font-semibold text-white/86 backdrop-blur"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
          <div className="rounded-md bg-[var(--color-ink)] px-5 py-5 text-white">
            <p className="text-3xl font-bold">50+</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              เริ่มต้นล็อตเล็กสำหรับร้านใหม่
            </p>
          </div>
          <div className="rounded-md bg-[var(--color-accent-dark)] px-5 py-5 text-white">
            <p className="text-3xl font-bold">3 เกรด</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              คัดสภาพสินค้าให้เลือกตามงบ
            </p>
          </div>
          <div className="rounded-md bg-[var(--color-primary)] px-5 py-5 text-white">
            <p className="text-3xl font-bold">พร้อมขาย</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              จัดหมวดและรูปภาพสำหรับทำโปรโมชัน
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-4 py-14 sm:px-6 lg:px-8"
        id="collections"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                ล็อตภาพแนะนำ
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--color-ink)] sm:text-4xl">
                เลือกจากภาพสินค้าและสไตล์ที่ขายได้จริง
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--color-muted)]">
              ทุกหมวดออกแบบให้ร้านค้าดูภาพรวมได้เร็ว ทั้งสำหรับขายไลฟ์ ลงเพจ และจัดหน้าร้าน
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {collections.map((collection) => (
              <article
                className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]"
                key={collection.title}
              >
                <div className="relative">
                  <img
                    alt={collection.title}
                    className="aspect-[4/5] w-full object-cover"
                    src={collection.image}
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[color:var(--color-ink)]/78 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {collection.tag}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-lg font-bold text-[var(--color-ink)]">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {collection.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-[var(--color-ink)] px-4 py-14 text-white sm:px-6 lg:px-8"
        id="packages"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[color:var(--color-surface-strong)]">
              แพ็กค้าส่ง
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
              สั่งเป็นล็อตตามจังหวะขายของร้าน
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              เหมาะกับร้านที่ต้องการคุมทุนและวางแผนสต็อกเป็นรอบ เลือกขนาดล็อตตามช่องทางขายและความถี่ในการเติมสินค้า
            </p>
          </div>

          <div className="grid gap-3">
            {packageDeals.map((deal) => (
              <article
                className="rounded-md border border-white/12 bg-white/[0.06] p-5"
                key={deal.title}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{deal.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      {deal.detail}
                    </p>
                  </div>
                  <p className="shrink-0 rounded-md bg-[var(--color-surface-strong)] px-4 py-2 text-base font-bold text-[var(--color-primary-dark)]">
                    {deal.quantity}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8" id="contact">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <img
              alt="ล็อตเสื้อผ้าพร้อมจัดส่ง"
              className="aspect-[3/4] rounded-md object-cover"
              src={collectionRacks}
            />
            <img
              alt="สินค้าแฟชั่นสำหรับทำโปรโมชัน"
              className="mt-8 aspect-[3/4] rounded-md object-cover"
              src={collectionKnitwear}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              เติมสต็อกล็อตถัดไป
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--color-ink)] sm:text-4xl">
              ส่งจำนวนที่ต้องการ แล้วให้ทีมจัดรูปล็อตสำหรับร้านคุณ
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
              แจ้งงบประมาณ หมวดสินค้าที่อยากได้ และช่องทางขาย ทีมจะช่วยแนะนำล็อตที่เหมาะกับรอบขายของร้าน
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)]"
              role="status"
            >
              <span
                className={[
                  'size-2 rounded-full',
                  apiStatus === 'ready'
                    ? 'bg-[var(--color-accent)]'
                    : apiStatus === 'checking'
                      ? 'bg-[var(--color-primary)]'
                      : 'bg-[var(--color-wine)]',
                ].join(' ')}
              />
              {apiStatusText}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="flex min-h-12 items-center justify-center rounded-md bg-[var(--color-primary)] px-5 text-base font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
                href="https://line.me/R/ti/p/@mikijapan"
                rel="noreferrer"
                target="_blank"
              >
                ขอรูปล็อตทางไลน์
              </a>
              <a
                className="flex min-h-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-base font-semibold text-[var(--color-primary-dark)] transition hover:bg-white"
                href="#packages"
              >
                ดูแพ็กค้าส่ง
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
