import { Bean, Gift, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function HomeScreen() {
  return (
    <div className="flex flex-col h-full p-4 space-y-6 bg-gradient-to-b from-black to-blue-950">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">BeanBrew</h1>
          <p className="text-blue-400">Good morning, Coffee Lover!</p>
        </div>
        <div className="flex items-center bg-blue-900 rounded-full px-3 py-1">
          <Bean className="h-4 w-4 text-blue-300 mr-1" />
          <span className="text-white font-bold">2,450</span>
        </div>
      </header>

      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">Bean Level</h2>
            <span className="text-blue-300">Level 7</span>
          </div>
          <Progress value={65} className="h-2 bg-blue-950" />
          <p className="text-xs text-blue-300 mt-2">Earn 550 more beans to reach Level 8</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-3 text-white">Daily Games</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-900/20 border-blue-800">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="bg-blue-800 rounded-full p-3 mb-2">
                <Trophy className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-sm font-medium text-white">Bean Quiz</h3>
              <p className="text-xs text-blue-300 mt-1">+100 beans</p>
              <Button className="mt-2 w-full bg-blue-700 hover:bg-blue-600">Play</Button>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/20 border-blue-800">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="bg-blue-800 rounded-full p-3 mb-2">
                <Gift className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-sm font-medium text-white">Daily Spin</h3>
              <p className="text-xs text-blue-300 mt-1">Up to 500 beans</p>
              <Button className="mt-2 w-full bg-blue-700 hover:bg-blue-600">Spin</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-white">Rewards</h2>
          <Button variant="link" className="text-blue-400 p-0">
            See all
          </Button>
        </div>
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-800 rounded-full p-3 mr-3">
              <Bean className="h-6 w-6 text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Free Coffee</h3>
              <p className="text-xs text-blue-300">Redeem 1,000 beans</p>
            </div>
            <Button size="sm" className="bg-blue-700 hover:bg-blue-600">
              Claim
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
