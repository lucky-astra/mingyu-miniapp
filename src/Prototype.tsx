import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  BarChartIcon,
  ChatBubbleIcon,
  CheckIcon,
  ChevronRightIcon,
  CodeIcon,
  CopyIcon,
  DashboardIcon,
  DesktopIcon,
  DotsHorizontalIcon,
  GlobeIcon,
  GridIcon,
  HomeIcon,
  LayersIcon,
  MobileIcon,
  PaperPlaneIcon,
  Pencil2Icon,
  RocketIcon,
  StackIcon,
} from "@radix-ui/react-icons";
import { BottomSheet, Carousel, MobileScroll } from "./mobile";

const websiteItems = [
  { title: "手机网站", detail: "移动优先，打开快、体验好", icon: MobileIcon },
  { title: "PC网站", detail: "专业展示品牌与业务能力", icon: DesktopIcon },
  { title: "商城网站", detail: "支持商品展示、交易与运营", icon: BarChartIcon },
  { title: "其他网站", detail: "根据业务场景灵活定制", icon: StackIcon },
];

const systemItems = [
  { title: "管理系统", detail: "业务流程数字化，数据集中管理", icon: DashboardIcon },
  { title: "客服系统", detail: "多渠道接待，提升服务效率", icon: ChatBubbleIcon },
  { title: "物流系统", detail: "订单、仓储与配送协同", icon: PaperPlaneIcon },
  { title: "其他系统", detail: "围绕企业流程按需开发", icon: LayersIcon },
];

const softwareItems = [
  { title: "APP软件", detail: "iOS、Android 多端应用开发", icon: MobileIcon },
  { title: "小程序软件", detail: "微信小程序设计与开发", icon: GridIcon },
  { title: "公众号软件", detail: "公众号功能与服务集成", icon: ChatBubbleIcon },
  { title: "其他软件", detail: "H5、桌面端及业务工具", icon: StackIcon },
];

const serviceGroups = [
  { id: "system", title: "系统开发", subtitle: "各类系统，按需定制", icon: LayersIcon, items: systemItems },
  { id: "website", title: "网站开发", subtitle: "各类网站，量身打造", icon: GlobeIcon, items: websiteItems },
  { id: "software", title: "软件开发", subtitle: "多端应用，一体交付", icon: GridIcon, items: softwareItems },
] as const;

type ServiceGroupId = (typeof serviceGroups)[number]["id"];
type ServiceItem = (typeof serviceGroups)[number]["items"][number];

const steps = [
  { no: "01", title: "需求梳理", detail: "深入沟通，明确项目范围", icon: DashboardIcon },
  { no: "02", title: "体验设计", detail: "梳理结构，打磨产品体验", icon: Pencil2Icon },
  { no: "03", title: "技术开发", detail: "工程实现，保障稳定安全", icon: CodeIcon },
  { no: "04", title: "上线交付", detail: "部署上线，持续支持优化", icon: PaperPlaneIcon },
];

type SheetMode = "contact" | "service" | null;

export default function Prototype() {
  const [sheetMode, setSheetMode] = useState<SheetMode>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem>(websiteItems[0]);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "services" | "contact">("home");
  const [activeServiceId, setActiveServiceId] = useState<ServiceGroupId>("website");

  useEffect(() => {
    let scrollFrame = 0;
    let carousel: HTMLElement | null = null;
    let updateActiveService: (() => void) | null = null;
    const frame = window.requestAnimationFrame(() => {
      carousel = document.querySelector<HTMLElement>(".service-carousel");
      const activeCard = document.querySelector<HTMLElement>("[data-service-card='website']");
      if (!carousel || !activeCard) return;

      updateActiveService = () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = window.requestAnimationFrame(() => {
          if (!carousel) return;
          const center = carousel.scrollLeft + carousel.clientWidth / 2;
          const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-service-card]"));
          const closest = cards.reduce((current, card) => {
            const currentDistance = Math.abs(current.offsetLeft + current.clientWidth / 2 - center);
            const cardDistance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
            return cardDistance < currentDistance ? card : current;
          });
          setActiveServiceId(closest.dataset.serviceCard as ServiceGroupId);
        });
      };

      carousel.scrollLeft = activeCard.offsetLeft - (carousel.clientWidth - activeCard.clientWidth) / 2;
      updateActiveService();
      carousel.addEventListener("scroll", updateActiveService, { passive: true });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(scrollFrame);
      if (carousel && updateActiveService) carousel.removeEventListener("scroll", updateActiveService);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id === "services" ? "services" : "home");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openService = (service: ServiceItem) => {
    setSelectedService(service);
    setFeedback("");
    setSheetMode("service");
  };

  const openContact = () => {
    setActiveTab("contact");
    setFeedback("");
    setSheetMode("contact");
  };

  const copyWeChat = async () => {
    try {
      await navigator.clipboard.writeText("18507557644");
      setFeedback("微信号已复制");
    } catch {
      setFeedback("微信号：18507557644");
    }
  };

  return (
    <div className="miniapp-shell">
      <MobileScroll className="app-screen">
        <main className="miniapp-content" id="home" aria-label="明彧科技微信小程序首页">
          <header className="miniapp-header">
            <img src="/assets/mingyu-lockup.png" alt="明彧科技" className="brand-lockup" />
            <button className="miniapp-capsule" aria-label="更多小程序操作">
              <DotsHorizontalIcon />
              <span aria-hidden="true" />
              <GlobeIcon />
            </button>
          </header>

          <section className="hero">
            <div className="hero-copy">
              <h1>设计有想法，<br />开发能落地</h1>
              <p>网站、小程序、APP与企业系统，<br />一站式设计开发</p>
              <button className="primary-button" onClick={openContact}>
                开始一个项目 <ArrowRightIcon />
              </button>
            </div>
            <img className="hero-visual" src="/assets/hero-product-suite.png" alt="网站、小程序和应用界面组合" />
          </section>

          <section className="service-section" id="services">
            <div className="section-title">
              <span aria-hidden="true" />
              <h2>我们能为你做什么</h2>
            </div>
            <Carousel className="service-carousel" contentClassName="service-track" ariaLabel="服务类别，可左右滑动">
              {serviceGroups.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <article className={`service-card ${group.id}-card`} data-service-card={group.id} key={group.id}>
                    <div className="service-card-heading">
                      <div>
                        <GroupIcon />
                        <h3>{group.title}</h3>
                        <p>{group.subtitle}</p>
                      </div>
                      <ArrowRightIcon />
                    </div>
                    <div className="service-list">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button key={item.title} className="service-row" onClick={() => openService(item)}>
                            <span className="service-row-icon"><Icon /></span>
                            <span>
                              <strong>{item.title}</strong>
                              <small>{item.detail}</small>
                            </span>
                            <ChevronRightIcon />
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </Carousel>
            <div className="carousel-hint" aria-hidden="true">
              {serviceGroups.map((group) => <i className={activeServiceId === group.id ? "active" : ""} key={group.id} />)}
              <span>左右滑动查看更多</span>
            </div>
          </section>

          <section className="process-section" id="process">
            <div className="section-title">
              <span aria-hidden="true" />
              <h2>我们的工作流程</h2>
            </div>
            <div className="process-grid">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article className="process-card" key={step.no}>
                    <Icon />
                    <div><b>{step.no}</b><strong>{step.title}</strong><small>{step.detail}</small></div>
                  </article>
                );
              })}
            </div>
          </section>

          <button className="contact-band" onClick={openContact}>
            <span className="contact-band-icon"><MobileIcon /></span>
            <span><small>电话 / 微信</small><strong>18507557644</strong></span>
            <ArrowRightIcon />
          </button>

          <footer className="company-address">深圳市宝安区沙井街道云和路37号</footer>
        </main>
      </MobileScroll>

      <nav className="bottom-nav" aria-label="小程序主导航">
        <button className={activeTab === "home" ? "active" : ""} onClick={() => scrollTo("home")}><HomeIcon /><span>首页</span></button>
        <button className={activeTab === "services" ? "active" : ""} onClick={() => scrollTo("services")}><GridIcon /><span>服务</span></button>
        <button className={activeTab === "contact" ? "active" : ""} onClick={openContact}><ChatBubbleIcon /><span>联系</span></button>
      </nav>

      <BottomSheet
        open={sheetMode !== null}
        onOpenChange={(open) => !open && setSheetMode(null)}
        title={sheetMode === "service" ? selectedService.title : "联系我们"}
        description={sheetMode === "service" ? selectedService.detail : "电话与微信同号，我们会尽快回复。"}
        snap={0.42}
      >
        <div className="contact-sheet-actions">
          {sheetMode === "service" ? (
            <button className="sheet-primary" onClick={() => setSheetMode("contact")}>
              咨询这项服务 <ArrowRightIcon />
            </button>
          ) : (
            <>
              <button className="sheet-primary" onClick={() => setFeedback("正在准备拨打 18507557644")}>
                <MobileIcon /> 拨打 18507557644
              </button>
              <button className="sheet-secondary" onClick={copyWeChat}>
                {feedback === "微信号已复制" ? <CheckIcon /> : <CopyIcon />} 复制微信号
              </button>
            </>
          )}
          {feedback ? <p className="sheet-feedback" aria-live="polite">{feedback}</p> : null}
        </div>
      </BottomSheet>
    </div>
  );
}
