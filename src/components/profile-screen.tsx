import { Award, Bean, Calendar, ChevronRight, Coffee, CreditCard, Gift, History, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full p-4 space-y-6 bg-black">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center mr-4">
          <Coffee className="h-10 w-10 text-blue-300" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Alex Johnson</h1>
          <p className="text-blue-400">Coffee Enthusiast</p>
          <div className="flex items-center mt-1">
            <Bean className="h-4 w-4 text-blue-300 mr-1" />
            <span className="text-white font-bold">2,450</span>
            <span className="text-blue-400 text-sm ml-1">beans</span>
          </div>
        </div>
      </div>

      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold text-white">Gold Member</h2>
              <p className="text-xs text-blue-300">Since October 2023</p>
            </div>
            <Award className="h-6 w-6 text-yellow-500" />
          </div>
          <Progress value={65} className="h-2 bg-blue-950" />
          <div className="flex justify-between text-xs text-blue-300 mt-2">
            <span>Current: Gold</span>
            <span>Next: Platinum (5,000 beans)</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white px-1">Account</h2>

        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center">
                <History className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">Purchase History</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </button>
            <Separator className="bg-blue-800" />
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">Rewards</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </button>
            <Separator className="bg-blue-800" />
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">Payment Methods</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </button>
            <Separator className="bg-blue-800" />
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">Subscriptions</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white px-1">Preferences</h2>

        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-white">Settings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-auto">
        <Button variant="outline" className="w-full border-blue-800 text-blue-400 hover:bg-blue-900/20">
          Sign Out
        </Button>
      </div>
    </div>
  )
}
