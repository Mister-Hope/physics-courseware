export {};

declare global {
  interface SlidevTocNode {
    no?: number;
    title?: string;
    path?: string;
    children?: SlidevTocNode[];
  }

  interface Window {
    /** Slidev 在 window 上挂的运行态（用于翻页、读点击数、读目录） */
    __slidev__?: {
      nav: {
        total: number;
        currentPage: number;
        clicks: number;
        clicksTotal: number;
        tocTree: SlidevTocNode[];
        go: (page: number, clicks?: number) => void;
      };
    };
  }
}
