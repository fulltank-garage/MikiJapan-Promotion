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

const getApiStatusMeta = (status: ApiStatus) => {
  if (status === 'ready') {
    return {
      dotClass: 'bg-[var(--color-accent)]',
      text: 'พร้อมเชื่อมต่อ',
    }
  }

  if (status === 'checking') {
    return {
      dotClass: 'bg-[var(--color-primary)]',
      text: 'กำลังตรวจสอบ',
    }
  }

  return {
    dotClass: 'bg-[var(--color-wine)]',
    text: 'ติดต่อผ่าน LINE',
  }
}

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

  const apiStatusMeta = getApiStatusMeta(apiStatus)

  return (
    <main className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
        <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 pb-3 pt-[calc(env(safe-area-inset-top)+14px)]">
          <a className="flex min-w-0 items-center gap-3" href="#top">
            <img
              alt="Miki Japan"
              className="size-10 shrink-0 rounded-full border border-[var(--color-border)] object-cover shadow-sm"
              height="40"
              src={mikiJapanLogo}
              width="40"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-muted)]">
                Miki Japan
              </p>
              <p className="truncate text-lg font-semibold text-[var(--color-text)]">
                โปรโมชัน
              </p>
            </div>
          </a>
        </header>

        <section className="px-4 py-5" id="top">
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 text-sm font-semibold text-[var(--color-primary-dark)]">
              <span className="size-2 rounded-full bg-[var(--color-primary)]" />
              เสื้อผ้าญี่ปุ่นคัดเกรดสำหรับร้านค้า
            </div>

            <h1 className="text-[2rem] font-bold leading-[1.16] text-[var(--color-ink)]">
              โปรโมชันเสื้อผ้า
              <span className="whitespace-nowrap">ค้าส่ง</span>
              <span className="block text-[var(--color-primary-dark)]">
                พร้อมขายสำหรับร้านคุณ
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              รวมล็อตเสื้อยืด เชิ้ต เดรส แจ็กเก็ต และแฟชั่นวินเทจ คัดหมวดให้เลือกง่าย เหมาะกับร้านที่ต้องการเติมสต็อกเร็วทั้งออนไลน์และหน้าร้าน
            </p>

            <div className="mt-7 grid grid-cols-3 gap-2">
              {highlights.map((item) => (
                <div
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-center text-sm font-semibold leading-5 text-[var(--color-text)]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <a
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--color-primary)] px-5 text-base font-semibold text-white shadow-sm transition active:scale-[0.99] hover:bg-[var(--color-primary-dark)]"
                href="#collections"
              >
                ดูล็อตแนะนำ
              </a>
              <a
                className="flex min-h-12 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-base font-semibold text-[var(--color-primary-dark)] transition active:scale-[0.99] hover:bg-[var(--color-surface-strong)]"
                href="#contact"
              >
                ติดต่อสั่งค้าส่ง
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm">
            <img
              alt="ราวเสื้อผ้าค้าส่งของ Miki Japan"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              src={heroWholesale}
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/35 bg-[color:var(--color-ink)]/72 px-4 py-3 text-white shadow-lg backdrop-blur">
              <p className="text-sm font-semibold">ล็อตค้าส่งพร้อมขาย</p>
              <p className="mt-1 text-xs leading-5 text-white/78">
                ดูภาพสินค้า เลือกแพ็ก แล้วติดต่อทีมงานผ่าน LINE
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            ['50+', 'เริ่มต้นล็อตเล็กสำหรับร้านใหม่'],
            ['3 เกรด', 'คัดสภาพสินค้าให้เลือกตามงบ'],
            ['พร้อมขาย', 'จัดหมวดและรูปภาพสำหรับทำโปรโมชัน'],
          ].map(([value, label]) => (
            <div
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm"
              key={value}
            >
              <p className="text-2xl font-bold text-[var(--color-ink)]">
                {value}
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="px-4 py-5"
        id="collections"
      >
        <div>
          <div className="mb-5 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
                ล็อตภาพแนะนำ
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--color-ink)]">
                เลือกจากภาพสินค้าและสไตล์ที่ขายได้จริง
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
              ทุกหมวดออกแบบให้ร้านค้าดูภาพรวมได้เร็ว ทั้งสำหรับขายไลฟ์ ลงเพจ และจัดหน้าร้าน
            </p>
          </div>

          <div className="grid gap-4">
            {collections.map((collection) => (
              <article
                className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                key={collection.title}
              >
                <div className="relative">
                  <img
                    alt={collection.title}
                    className="aspect-[4/5] w-full object-cover"
                    src={collection.image}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[color:var(--color-ink)]/78 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {collection.tag}
                  </span>
                </div>
                <div className="px-5 py-5">
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
        className="px-4 py-5"
        id="packages"
      >
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-ink)] p-5 text-white shadow-sm">
          <div className="grid gap-8">
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
                  className="rounded-2xl border border-white/12 bg-white/[0.08] p-5"
                  key={deal.title}
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{deal.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        {deal.detail}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-2xl bg-[var(--color-surface-strong)] px-4 py-2 text-base font-bold text-[var(--color-primary-dark)]">
                      {deal.quantity}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-5 pb-[calc(env(safe-area-inset-bottom)+24px)]" id="contact">
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-3">
            <img
              alt="ล็อตเสื้อผ้าพร้อมจัดส่ง"
              className="aspect-[3/4] rounded-[2rem] border border-[var(--color-border)] object-cover shadow-sm"
              src={collectionRacks}
            />
            <img
              alt="สินค้าแฟชั่นสำหรับทำโปรโมชัน"
              className="mt-8 aspect-[3/4] rounded-[2rem] border border-[var(--color-border)] object-cover shadow-sm"
              src={collectionKnitwear}
            />
          </div>

          <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <p className="text-sm font-semibold text-[var(--color-primary-dark)]">
              เติมสต็อกล็อตถัดไป
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--color-ink)]">
              ส่งจำนวนที่ต้องการ แล้วให้ทีมจัดรูปล็อตสำหรับร้านคุณ
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
              แจ้งงบประมาณ หมวดสินค้าที่อยากได้ และช่องทางขาย ทีมจะช่วยแนะนำล็อตที่เหมาะกับรอบขายของร้าน
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)]"
              role="status"
            >
              <span
                className={['size-2 rounded-full', apiStatusMeta.dotClass].join(
                  ' ',
                )}
              />
              {apiStatusMeta.text}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--color-primary)] px-5 text-base font-semibold text-white shadow-sm transition active:scale-[0.99] hover:bg-[var(--color-primary-dark)]"
                href="https://line.me/R/ti/p/@mikijapan"
                rel="noreferrer"
                target="_blank"
              >
                ขอรูปล็อตทางไลน์
              </a>
              <a
                className="flex min-h-12 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-base font-semibold text-[var(--color-primary-dark)] transition active:scale-[0.99] hover:bg-[var(--color-surface-strong)]"
                href="#packages"
              >
                ดูแพ็กค้าส่ง
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}

export default App
