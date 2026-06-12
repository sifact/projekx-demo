import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  LayoutDashboard, Folder, CheckCircle2, Users, TrendingUp,
  LayoutTemplate, Globe, FileText, Layers, Code2, BookOpen, HelpCircle,
  Search, Bell, Zap, Plus, Calendar, BarChart2, Activity,
  LogOut, ArrowRight, FolderOpen, Clock, Menu, X,
  Mail, Phone, MessageSquare, ExternalLink, Play,
  ChevronDown, Star, Award, Shield, Database,
  LayoutGrid, List, MoreVertical, Settings, CheckCheck, Circle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getCurrentUser, logoutUser } from '@/utils/auth'
import type { Page, User } from '@/types'

interface Props { navigate: (to: Page) => void }

const mainNav: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard',  label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'projects',   label: 'My Projects',   icon: Folder },
  { id: 'tasks',      label: 'My Tasks',      icon: CheckCircle2 },
  { id: 'team',       label: 'Team Members',  icon: Users },
  { id: 'analytics',  label: 'Analytics',     icon: TrendingUp },
]

const resourcesNav: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'templates',    label: 'Templates',    icon: LayoutTemplate },
  { id: 'community',   label: 'Community',    icon: Globe },
  { id: 'blog',        label: 'Blog',         icon: FileText },
  { id: 'integrations',label: 'Integrations', icon: Layers },
  { id: 'api',         label: 'API Docs',     icon: Code2 },
  { id: 'tutorials',   label: 'Tutorials',    icon: BookOpen },
  { id: 'support',     label: 'Support',      icon: HelpCircle },
]

const allNav = [...mainNav, ...resourcesNav]

// ─── Shared UI ────────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, desc, action, onAction }: {
  icon: LucideIcon; title: string; desc: string; action?: string; onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <Icon className="h-14 w-14 text-gray-200 mb-4" />
      <h3 className="font-bold text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">{desc}</p>
      {action && (
        <button onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          {action}
        </button>
      )}
    </div>
  )
}

function PageHeader({ title, subtitle, action, icon: Icon }: {
  title: string; subtitle?: string; action?: ReactNode; icon?: LucideIcon
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-black text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

// ─── Notifications Page ───────────────────────────────────────────────────────

function NotificationsPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-400 mt-0.5">You have 0 unread notifications</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 h-10 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 h-10 text-sm font-semibold transition-colors">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <EmptyState icon={Bell} title="No notifications yet"
          desc="When you get notifications, they'll show up here. Stay tuned!" />
      </div>
    </div>
  )
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────

function DashboardHome({ user }: { user: User }) {
  const stats = [
    { label: 'Total Projects',  value: 0,    icon: FolderOpen,   bg: 'bg-blue-500' },
    { label: 'Completed Tasks', value: 0,    icon: CheckCircle2, bg: 'bg-green-500' },
    { label: 'Pending Tasks',   value: 0,    icon: Clock,        bg: 'bg-amber-500' },
    { label: 'Completion Rate', value: '0%', icon: TrendingUp,   bg: 'bg-purple-500' },
  ]
  const quickActions = [
    { label: 'Create Project', sub: 'Start New Project',  icon: Plus,     bg: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { label: 'Invite Team',    sub: 'Add collaborators',  icon: Users,    bg: 'bg-green-500' },
    { label: 'Calendar',       sub: 'View deadlines',     icon: Calendar, bg: 'bg-amber-500' },
    { label: 'Analytics',      sub: 'View insights',      icon: BarChart2,bg: 'bg-purple-500' },
  ]

  return (
    <div className="flex flex-col xl:flex-row gap-5">
      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-gradient-to-r from-violet-50 via-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">Welcome back, {user.firstName}!</h2>
          <p className="text-gray-500 text-sm">Here's your project overview. Let's make today productive.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(({ label, value, icon: Icon, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 sm:p-5 text-white`}>
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] text-white/80 mb-0.5">{label}</p>
              <p className="text-2xl sm:text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
                <Folder className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Recent Projects</h3>
                <p className="text-xs text-gray-400">Your Latest Projects Board</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 font-medium">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <EmptyState icon={Folder} title="No projects yet" desc="Create your first project to get started" />
        </div>
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
              <p className="text-xs text-gray-400">Latest updates</p>
            </div>
          </div>
          <EmptyState icon={Activity} title="No recent activity" desc="Your activity will appear here once you start working" />
        </div>
      </div>
      <div className="xl:w-[340px] flex-shrink-0 space-y-5">
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-purple-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Quick Actions</p>
              <p className="text-white/70 text-xs">Get things done faster</p>
            </div>
          </div>
          <div className="bg-white p-3 space-y-2">
            {quickActions.map(({ label, sub, icon: Icon, bg }) => (
              <button key={label} className={`w-full ${bg} rounded-xl p-3.5 flex items-center gap-3 text-white hover:opacity-90 transition-opacity text-left`}>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none mb-0.5">{label}</p>
                  <p className="text-white/80 text-xs">{sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Team Members</p>
                <p className="text-xs text-gray-400">Your collaborative workspace</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 font-medium">
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <MemberRow user={user} compact />
          <button className="w-full mt-4 border border-gray-200 rounded-xl h-10 text-sm text-blue-500 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Invite Team Member
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── My Projects Page ─────────────────────────────────────────────────────────

function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorite, setFavorite] = useState(false)

  return (
    <div>
      <PageHeader
        title="My Projects"
        subtitle="Manage your projects and workflows"
        action={
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
            <Plus className="h-4 w-4" /> Create Project
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
        <div className="relative min-w-[160px] flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search Projects"
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>

        <button onClick={() => setFavorite(f => !f)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0">
          <div className={`relative w-9 h-5 rounded-full transition-colors ${favorite ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${favorite ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <Star className={`h-4 w-4 ${favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          <span>Favorite</span>
        </button>

        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
          <button onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`w-10 h-10 flex items-center justify-center border-l border-gray-200 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
            <List className="h-4 w-4" />
          </button>
        </div>

        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0">
          <BarChart2 className="h-4 w-4" />
          Analytics
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <EmptyState icon={FolderOpen} title="No projects found"
          desc="Create a project to start organizing your work, deadlines, and team collaboration."
          action="Create Your First Project" />
      </div>
    </div>
  )
}

// ─── My Tasks Page ────────────────────────────────────────────────────────────

type TaskStatus = 'working' | 'notstarted' | 'done'

const sampleTasks: { id: number; title: string; project: string | null; date: string; status: TaskStatus }[] = [
  { id: 1, title: 'This is great',                       project: 'PlanEX',        date: 'Nov 18, 2025', status: 'working' },
  { id: 2, title: 'Complete the Android and IOS app',    project: null,            date: 'Nov 21, 2025', status: 'working' },
  { id: 3, title: 'Complete the Web version of the app', project: null,            date: 'Nov 21, 2025', status: 'working' },
  { id: 4, title: 'Include ALL Features',                project: null,            date: 'Nov 21, 2025', status: 'working' },
  { id: 5, title: 'do something',                        project: 'New app build', date: 'Jan 13, 2026', status: 'notstarted' },
  { id: 6, title: 'blah',                                project: 'New app build', date: 'Feb 11, 2026', status: 'done' },
]

const statusConfig: Record<TaskStatus, { label: string; iconBg: string; badgeBg: string; badgeText: string }> = {
  working:    { label: 'Working on it', iconBg: 'bg-orange-400', badgeBg: 'bg-orange-50',  badgeText: 'text-orange-500' },
  notstarted: { label: 'Not Started',   iconBg: 'bg-gray-400',   badgeBg: 'bg-gray-100',   badgeText: 'text-gray-500' },
  done:       { label: 'Done',          iconBg: 'bg-green-500',  badgeBg: 'bg-green-50',   badgeText: 'text-green-600' },
}

function StatusIcon({ status }: { status: TaskStatus }) {
  const cfg = statusConfig[status]
  return (
    <div className={`w-9 h-9 rounded-full ${cfg.iconBg} flex items-center justify-center flex-shrink-0`}>
      {status === 'working'    && <Clock className="h-4 w-4 text-white" />}
      {status === 'notstarted' && <Circle className="h-4 w-4 text-white" />}
      {status === 'done'       && <CheckCircle2 className="h-4 w-4 text-white" />}
    </div>
  )
}

function TasksPage() {
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [projectFilter, setProjectFilter] = useState('All Projects')

  const projects = ['All Projects', ...Array.from(new Set(sampleTasks.filter(t => t.project).map(t => t.project!)))]
  const statuses = ['All Statuses', 'Working on it', 'Not Started', 'Done']

  const filtered = sampleTasks.filter(t => {
    const matchStatus = statusFilter === 'All Statuses' || statusConfig[t.status].label === statusFilter
    const matchProject = projectFilter === 'All Projects' || t.project === projectFilter
    return matchStatus && matchProject
  })

  return (
    <div>
      <PageHeader
        title="My Tasks"
        subtitle="All your assigned tasks across projects"
        action={
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
            <Plus className="h-4 w-4" /> Add Task
          </button>
        }
      />

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
        <div className="relative flex-1 min-w-[140px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search tasks"
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer">
          {projects.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map(task => {
          const cfg = statusConfig[task.status]
          return (
            <div key={task.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <StatusIcon status={task.status} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">{task.title}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {task.project && (
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {task.project}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {task.date}
                  </span>
                </div>
              </div>
              <span className={`flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                {cfg.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Team Members Page ────────────────────────────────────────────────────────

function TeamPage({ user }: { user: User }) {
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div>
      <PageHeader
        title="Team Members"
        subtitle="Collaborate with your team members and track their contributions"
        action={
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
            <Plus className="h-4 w-4" /> Invite Member
          </button>
        }
      />

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search team members..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Member</option>
          <option>Viewer</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white text-base font-bold flex-shrink-0">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm leading-snug truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-xs font-semibold bg-red-100 text-red-500 px-2.5 py-0.5 rounded-full">Admin</span>
              <button className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex border-t border-b border-gray-100 py-3 mb-3">
            <div className="flex-1 text-center">
              <p className="text-lg font-black text-gray-900">0</p>
              <p className="text-xs text-gray-400">Projects</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex-1 text-center">
              <p className="text-lg font-black text-gray-900">0</p>
              <p className="text-xs text-gray-400">Tasks Done</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Joined {joinDate}</span>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl py-2 text-sm font-semibold transition-colors">
            <Users className="h-4 w-4" />
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Page ───────────────────────────────────────────────────────────

function AnalyticsPage() {
  const metrics = [
    { label: 'Total Projects',  value: '0',  icon: FolderOpen,   color: 'bg-blue-500' },
    { label: 'Tasks Completed', value: '0',  icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Team Members',    value: '1',  icon: Users,        color: 'bg-violet-500' },
    { label: 'Productivity',    value: '0%', icon: TrendingUp,   color: 'bg-amber-500' },
  ]
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Insights into your team's performance" icon={TrendingUp} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {metrics.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-2xl font-black text-gray-900">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {['Project Completion Rate', 'Task Activity (Last 30 Days)'].map(title => (
          <div key={title} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-4">{title}</h3>
            <div className="flex items-end gap-1 h-28">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: '4px' }} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">No data yet — start a project to see analytics</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Templates Page ───────────────────────────────────────────────────────────

function TemplatesPage() {
  const templates = [
    { name: 'Agile Sprint Board',  desc: 'Run sprints with backlog, in-progress, and done columns.', icon: LayoutTemplate, color: 'bg-blue-500',   tag: 'Engineering' },
    { name: 'Product Roadmap',     desc: 'Plan quarters, milestones, and feature launches visually.', icon: TrendingUp,    color: 'bg-violet-500', tag: 'Product' },
    { name: 'Bug Tracker',         desc: 'Capture, prioritize, and close bugs across releases.',       icon: Shield,        color: 'bg-red-500',    tag: 'Engineering' },
    { name: 'Marketing Campaign',  desc: 'Coordinate campaigns from brief to publish date.',           icon: BarChart2,     color: 'bg-pink-500',   tag: 'Marketing' },
    { name: 'Content Calendar',    desc: 'Schedule and publish content with editorial workflows.',     icon: Calendar,      color: 'bg-amber-500',  tag: 'Marketing' },
    { name: 'Client Onboarding',   desc: 'Smooth onboarding flow for new clients and customers.',      icon: Users,         color: 'bg-green-500',  tag: 'Operations' },
  ]
  return (
    <div>
      <PageHeader title="Templates" subtitle="Kickstart projects with pre-built templates" icon={LayoutTemplate} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(({ name, desc, icon: Icon, color, tag }) => (
          <div key={name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
            <button className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-xl py-2 transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Community Page ───────────────────────────────────────────────────────────

function CommunityPage() {
  const channels = [
    { name: 'General Discussion', desc: 'Talk about anything projekx-related',   icon: MessageSquare, count: '2.4k members' },
    { name: 'Feature Requests',   desc: 'Suggest and vote on new features',       icon: Star,          count: '1.1k members' },
    { name: 'Tips & Tricks',      desc: 'Share workflows and productivity hacks', icon: Award,         count: '890 members' },
    { name: 'Announcements',      desc: 'Official product updates and news',       icon: Bell,          count: '5.2k members' },
  ]
  return (
    <div>
      <PageHeader title="Community" subtitle="Connect with thousands of projekx users" icon={Globe} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {channels.map(({ name, desc, icon: Icon, count }) => (
          <div key={name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
                <p className="text-xs text-gray-400">{count}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-300 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

function BlogPage() {
  const posts = [
    { title: '5 Ways to Boost Team Productivity with projekx',    date: 'Jun 10, 2025', category: 'Productivity', read: '4 min' },
    { title: 'Introducing Timeline View: Visualize Your Projects', date: 'Jun 5, 2025',  category: 'Product',      read: '2 min' },
    { title: 'How Remote Teams Stay Aligned Using projekx',        date: 'May 28, 2025', category: 'Remote Work',  read: '6 min' },
    { title: 'Automations 101: Save Hours Every Week',             date: 'May 20, 2025', category: 'Tutorial',     read: '5 min' },
    { title: "From Chaos to Clarity: A PM's Guide to projekx",     date: 'May 12, 2025', category: 'Guide',        read: '8 min' },
    { title: "Q2 Product Update: What's New in projekx",           date: 'May 1, 2025',  category: 'Updates',      read: '3 min' },
  ]
  return (
    <div>
      <PageHeader title="Blog" subtitle="Insights, tips, and product updates" icon={FileText} />
      <div className="space-y-3">
        {posts.map(({ title, date, category, read }) => (
          <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{category}</span>
                <span className="text-xs text-gray-400">{read} read</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{title}</h3>
              <p className="text-xs text-gray-400 mt-1">{date}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-300 flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Integrations Page ────────────────────────────────────────────────────────

function IntegrationsPage() {
  const integrations = [
    { name: 'Slack',        desc: 'Get task updates and notifications in your Slack channels.',     icon: MessageSquare, color: 'bg-green-500' },
    { name: 'GitHub',       desc: 'Link commits and pull requests to projekx tasks automatically.', icon: Code2,         color: 'bg-gray-800' },
    { name: 'Google Drive', desc: 'Attach Drive files directly to tasks and projects.',             icon: Database,      color: 'bg-yellow-500' },
    { name: 'Zapier',       desc: 'Connect projekx to 5000+ apps with no-code automation.',         icon: Zap,           color: 'bg-orange-500' },
    { name: 'Jira',         desc: 'Sync issues between Jira and projekx bidirectionally.',          icon: Layers,        color: 'bg-blue-600' },
    { name: 'Dropbox',      desc: 'Attach Dropbox files and folders to your projects.',             icon: FolderOpen,    color: 'bg-blue-400' },
  ]
  return (
    <div>
      <PageHeader title="Integrations" subtitle="Connect projekx with your favourite tools" icon={Layers} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(({ name, desc, icon: Icon, color }) => (
          <div key={name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
            <button className="w-full text-sm font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-400 rounded-xl py-2 transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── API Docs Page ────────────────────────────────────────────────────────────

function ApiDocsPage() {
  const endpoints = [
    { method: 'GET',    path: '/api/v1/projects',  desc: 'List all projects in your workspace' },
    { method: 'POST',   path: '/api/v1/projects',  desc: 'Create a new project' },
    { method: 'GET',    path: '/api/v1/tasks',     desc: 'List tasks with optional filters' },
    { method: 'POST',   path: '/api/v1/tasks',     desc: 'Create a new task in a project' },
    { method: 'PATCH',  path: '/api/v1/tasks/:id', desc: 'Update a task status or assignee' },
    { method: 'DELETE', path: '/api/v1/tasks/:id', desc: 'Delete a task permanently' },
    { method: 'GET',    path: '/api/v1/users',     desc: 'List all team members' },
    { method: 'GET',    path: '/api/v1/analytics', desc: 'Fetch workspace analytics data' },
  ]
  const badge: Record<string, string> = {
    GET: 'bg-green-100 text-green-700', POST: 'bg-blue-100 text-blue-700',
    PATCH: 'bg-amber-100 text-amber-700', DELETE: 'bg-red-100 text-red-700',
  }
  return (
    <div>
      <PageHeader title="API Docs" subtitle="Build on top of projekx with our REST API" icon={Code2}
        action={
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 hover:border-blue-400 px-4 py-2.5 rounded-xl transition-colors">
            <ExternalLink className="h-4 w-4" /> Full Docs
          </a>
        } />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-gray-500">Base URL:</span>
          <code className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">https://api.projekxhub.com</code>
        </div>
        <div className="divide-y divide-gray-50">
          {endpoints.map(({ method, path, desc }) => (
            <div key={path} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 hover:bg-gray-50 transition-colors">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded w-fit flex-shrink-0 ${badge[method]}`}>{method}</span>
              <code className="text-sm font-mono text-gray-800 flex-shrink-0">{path}</code>
              <p className="text-sm text-gray-500 sm:ml-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Tutorials Page ───────────────────────────────────────────────────────────

function TutorialsPage() {
  const tutorials = [
    { title: 'Getting Started with projekx',     duration: '5:32',  level: 'Beginner' },
    { title: 'Creating Your First Project',       duration: '3:15',  level: 'Beginner' },
    { title: 'Task Management Deep Dive',         duration: '8:47',  level: 'Intermediate' },
    { title: 'Using Automations to Save Time',    duration: '6:20',  level: 'Intermediate' },
    { title: 'Advanced Analytics & Reporting',    duration: '10:05', level: 'Advanced' },
    { title: 'Team Collaboration Best Practices', duration: '7:33',  level: 'Intermediate' },
  ]
  const levelColor: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
  }
  return (
    <div>
      <PageHeader title="Tutorials" subtitle="Learn projekx with step-by-step video guides" icon={BookOpen} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutorials.map(({ title, duration, level }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-32 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5 text-white ml-0.5" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[level]}`}>{level}</span>
                <span className="text-xs text-gray-400">{duration}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Support Page ─────────────────────────────────────────────────────────────

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqs = [
    { q: 'How do I create my first project?',  a: "Go to My Projects and click 'Create Project'. Give it a name, description, and due date, then invite team members." },
    { q: 'Can I change my plan later?',        a: 'Yes, you can upgrade or downgrade at any time from Settings › Billing.' },
    { q: 'How do I invite team members?',      a: "Navigate to Team Members and click 'Invite Member'. Enter their email and they'll receive an invitation link." },
    { q: 'Is my data backed up?',              a: 'Yes, all data is automatically backed up every hour to multiple geographic regions.' },
    { q: 'How do I export my data?',           a: "Go to Settings › Data & Privacy and click 'Export Data'. You'll receive a download link via email." },
  ]
  return (
    <div>
      <PageHeader title="Support" subtitle="We're here to help you succeed" icon={HelpCircle} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: MessageSquare, label: 'Live Chat',     desc: 'Chat with our team',   action: 'Start Chat',  color: 'bg-blue-500' },
          { icon: Mail,          label: 'Email Support', desc: 'hello@projekxhub.com', action: 'Send Email',  color: 'bg-violet-500' },
          { icon: Phone,         label: 'Phone Support', desc: '+1 (315) 277-3691',    action: 'Call Now',    color: 'bg-green-500' },
        ].map(({ icon: Icon, label, desc, action, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mx-auto mb-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{label}</h3>
            <p className="text-xs text-gray-400 mb-4">{desc}</p>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">{action}</button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors gap-3">
                <span className="text-sm font-semibold text-gray-800">{q}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function MemberRow({ user, compact }: { user: User; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className={`${compact ? 'w-9 h-9' : 'w-10 h-10'} rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
        {user.firstName[0]}{user.lastName[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-none mb-0.5">{user.firstName} {user.lastName}</p>
        <p className="text-xs text-gray-400 truncate">{user.email}</p>
      </div>
      <span className="text-xs font-semibold bg-red-100 text-red-500 px-2.5 py-1 rounded-full flex-shrink-0">Admin</span>
    </div>
  )
}

function renderPage(id: string, user: User) {
  switch (id) {
    case 'notifications': return <NotificationsPage />
    case 'projects':      return <ProjectsPage />
    case 'tasks':         return <TasksPage />
    case 'team':          return <TeamPage user={user} />
    case 'analytics':     return <AnalyticsPage />
    case 'templates':     return <TemplatesPage />
    case 'community':     return <CommunityPage />
    case 'blog':          return <BlogPage />
    case 'integrations':  return <IntegrationsPage />
    case 'api':           return <ApiDocsPage />
    case 'tutorials':     return <TutorialsPage />
    case 'support':       return <SupportPage />
    default:              return <DashboardHome user={user} />
  }
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function DashboardPage({ navigate }: Props) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getCurrentUser()

  if (!user) { navigate('login'); return null }

  const handleNav = (id: string) => { setActiveNav(id); setSidebarOpen(false) }
  const handleLogout = () => { logoutUser(); navigate('login') }
  const pageTitle = allNav.find(n => n.id === activeNav)?.label ?? 'Dashboard'

  return (
    <div className="flex h-screen bg-[#F4F6F9] overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-[250px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <img src="/logo/1.avif" alt="projekx" className="h-9 w-auto" />
          <button onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {mainNav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors text-left ${
                activeNav === id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </button>
          ))}

          <div className="mt-6 mb-2 px-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resources</span>
          </div>

          {resourcesNav.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => handleNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors text-left ${
                activeNav === id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors text-left">
            <LogOut className="h-4 w-4 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-100 h-14 flex items-center px-4 sm:px-6 gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0">
            <Menu className="h-5 w-5" />
          </button>

          <span className="lg:hidden font-bold text-gray-900 text-sm truncate">{pageTitle}</span>

          <div className="relative hidden sm:block max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search Projects..."
              className="w-full bg-gray-100 rounded-full pl-9 pr-4 h-9 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0">
            <button onClick={() => handleNav('notifications')}
              className={`p-2 rounded-full transition-colors ${
                activeNav === 'notifications' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}>
              <Bell className="h-5 w-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold select-none cursor-pointer">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderPage(activeNav, user)}
        </main>
      </div>
    </div>
  )
}
