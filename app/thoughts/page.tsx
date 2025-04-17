import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"

// 示例随想数据
const thoughts = [
  {
    id: 1,
    content: "今天尝试了新的状态管理库，比预期的要好用很多！推荐给正在寻找 Redux 替代品的开发者。",
    date: "2023-12-20T12:30:00",
    likes: 24,
    comments: 5,
    shares: 3,
    author: {
      name: "Wesley Peng",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: 2,
    content: "刚读完《Clean Code》这本书，强烈推荐给所有软件工程师。书中的原则将彻底改变你的编码方式。",
    date: "2023-12-18T15:45:00",
    likes: 36,
    comments: 8,
    shares: 12,
    author: {
      name: "Wesley Peng",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: 3,
    content: "发现一个有趣的 CSS 技巧：使用 :has() 选择器可以实现以前需要 JavaScript 才能完成的样式逻辑。",
    date: "2023-12-15T09:20:00",
    likes: 42,
    comments: 12,
    shares: 8,
    author: {
      name: "Wesley Peng",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    attachment: {
      type: "code",
      content: `/* 使用 :has() 选择器的例子 */
.card:has(.featured) {
  border-color: gold;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* 当输入框获得焦点时改变父元素样式 */
.input-container:has(input:focus) {
  background-color: #f0f9ff;
}`,
    },
  },
  {
    id: 4,
    content: "参加了今天的技术分享会，关于 WebAssembly 的未来发展。感觉这项技术将在未来几年彻底改变 Web 开发。",
    date: "2023-12-10T18:15:00",
    likes: 18,
    comments: 3,
    shares: 2,
    author: {
      name: "Wesley Peng",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: 5,
    content:
      "今晚在写代码的过程中处理一些用户交互细节的时候有所思：\n\n在过去的几个月中我一直在全力开发 Follow 这个项目，出于热爱，出于对产品还有开源的热爱。想方设法的让它变得更好。以至于这样，在过去的几个月中我几乎没有停歇过，即便是休息日。还要去同事负责的模块，去修改那些细节问题，他们不注重的，好像等着我去处理了，我只是个 UI/UX 强迫症，看到不爽的就想改掉而已。但现在转念一想，我只是一个打工人罢了，我也不是 LD，我何必要管这么多，只是拿着一份死工资，以及等待着随时都有可能让你滚蛋的一句话。何必呢不如随他们一样，管好自己的一亩三分地就好了。\n\n确实也是心累了。",
    date: "2023-11-01T22:30:00",
    likes: 54,
    comments: 8,
    shares: 10,
    author: {
      name: "Wesley Peng",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
]

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN })
  } catch (e) {
    return dateString
  }
}

export default function ThoughtsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">随想</h1>
        <p className="text-muted-foreground">记录日常思考、技术见解和生活感悟。</p>
      </div>

      <div className="space-y-8">
        {thoughts.map((thought) => (
          <div key={thought.id} className="border-b pb-8 last:border-0">
            <div className="flex items-start gap-3">
              <Image
                src={thought.author.avatar || "/placeholder.svg"}
                alt={thought.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{thought.author.name}</span>
                  <span className="text-sm text-muted-foreground">{formatDate(thought.date)}</span>
                </div>

                <div className="mb-4">
                  {thought.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {thought.attachment?.type === "code" && (
                  <div className="bg-secondary rounded-md p-4 mb-4 overflow-x-auto font-mono text-sm">
                    <pre>{thought.attachment.content}</pre>
                  </div>
                )}

                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{thought.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thought.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>{thought.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
