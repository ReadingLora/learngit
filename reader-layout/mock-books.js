/**
 * 阅读器原型：模拟书架数据；前两本各 5 条 Block，《战斗细胞》默认 0 条（便于测无笔记）。
 * 由 script.js 在「该书笔记为空」时写入 localStorage，不覆盖已有数据。
 */
var READER_MOCK_BOOKS = [
  {
    id: "jzs",
    title: "置身事内：中国政府与经济发展",
    shortTitle: "置身事内",
    author: "兰小欢",
    coverSrc: "../book-card/cover.jpg",
    progressPercent: 70,
    blocks: [
      {
        id: 101001,
        type: "quote",
        content: "摘录 · 置身事内\n地方政府不仅参与资源分配，也深度参与生产和分配过程。",
        createdAt: 1715500800000
      },
      {
        id: 101002,
        type: "question",
        content: "问题\n为什么本书强调「土地财政」与地方投资冲动之间的关系？",
        createdAt: 1715587200000
      },
      {
        id: 101003,
        type: "ai_mock",
        content: "AI 小结（模拟）\n可用「中央—地方—企业」三角关系理解一章内的案例线索。",
        createdAt: 1715673600000
      },
      {
        id: 101004,
        type: "quote",
        content: "摘录 · 债务与工业化\n债务本身是中性的，关键是资金投向能否提高生产率。",
        createdAt: 1715760000000
      },
      {
        id: 101005,
        type: "note",
        content: "我的随想\n读到这里联想到：政策工具往往捆绑了激励结构，分析时要把「钱从哪来、到哪去」写清楚。",
        createdAt: 1715846400000
      }
    ]
  },
  {
    id: "fan",
    title: "反脆弱：从不确定性中获益",
    shortTitle: "反脆弱",
    author: "纳西姆·尼古拉斯·塔勒布",
    coverSrc:
      "../book-card/%E3%80%8A%E5%8F%8D%E8%84%86%E5%BC%B1%E3%80%8B.jpg",
    progressPercent: 12,
    blocks: [
      {
        id: 102001,
        type: "quote",
        content: "摘录 · 反脆弱\n风会熄灭蜡烛，却能使火越烧越旺。",
        createdAt: 1715500800000
      },
      {
        id: 102002,
        type: "ai_mock",
        content: "概念卡（模拟）\n反脆弱：从冲击中获益的性质；与「强韧」不同之处在于不对称收益。",
        createdAt: 1715587200000
      },
      {
        id: 102003,
        type: "question",
        content: "问题\n「可选性」与「试错」在实践里如何与成本控制平衡？",
        createdAt: 1715673600000
      },
      {
        id: 102004,
        type: "quote",
        content: "摘录 · 杠铃策略\n极端保守与极端冒险的组合，避开中庸风险区。",
        createdAt: 1715760000000
      },
      {
        id: 102005,
        type: "note",
        content: "随想\n把「随机性」当朋友：小成本多试探，保留上行空间。",
        createdAt: 1715846400000
      }
    ]
  },
  {
    id: "cell",
    title: "战斗细胞：人体免疫系统中的奇妙之旅",
    shortTitle: "战斗细胞",
    author: "菲利普·德特默",
    coverSrc:
      "../book-card/%E3%80%8A%E6%88%98%E6%96%97%E7%BB%86%E8%83%9E%E3%80%8B.jpg",
    progressPercent: 0,
    /* 默认无 Mock 块：便于测试「无笔记」列表与导出；需要时可在阅读页用 ?clearCellNotes=1 清空本机已写入的 cell 笔记 */
    blocks: []
  }
];
