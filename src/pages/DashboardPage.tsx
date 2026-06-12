import React, { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  LayoutDashboard, Folder, CheckCircle2, Users, TrendingUp,
  LayoutTemplate, Globe, FileText, Layers, Code2, BookOpen, HelpCircle,
  Search, Bell, Zap, Plus, Calendar, BarChart2, Activity,
  LogOut, ArrowRight, FolderOpen, Clock, Menu, X,
  Mail, Phone, MessageSquare, MessageCircle, Play,
  ChevronDown, Star, Database,
  LayoutGrid, List, MoreVertical, Settings, CheckCheck, Circle,
  ThumbsUp, ThumbsDown, Share2,
  PhoneCall, GraduationCap, ClipboardList, CheckSquare,
  User as UserIcon, File, Link2, Lock,
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
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <Icon className="h-12 w-12 text-gray-300 mb-3" />
      <h3 className="font-bold text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-5 max-w-xs">{desc}</p>
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

function HeroHeader({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Icon className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-400 text-sm max-w-lg mx-auto">{subtitle}</p>
    </div>
  )
}

const methodBadge: Record<string, string> = {
  GET:    'bg-blue-100 text-blue-700',
  POST:   'bg-amber-100 text-amber-700',
  PATCH:  'bg-purple-100 text-purple-700',
  DELETE: 'bg-red-100 text-red-700',
  DEL:    'bg-red-100 text-red-700',
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
            <Settings className="h-4 w-4" />Settings
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 h-10 text-sm font-semibold transition-colors">
            <CheckCheck className="h-4 w-4" />Mark all as read
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <EmptyState icon={Bell} title="No notifications yet" desc="When you get notifications, they'll show up here." />
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
    { label: 'Create Project', sub: 'Start New Project',  icon: Plus,      bg: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { label: 'Invite Team',    sub: 'Add collaborators',  icon: Users,     bg: 'bg-green-500' },
    { label: 'Calendar',       sub: 'View deadlines',     icon: Calendar,  bg: 'bg-amber-500' },
    { label: 'Analytics',      sub: 'View insights',      icon: BarChart2, bg: 'bg-purple-500' },
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

// ─── Create Project Modal ─────────────────────────────────────────────────────

const projectColors = [
  { value: '#3B82F6', label: 'Blue' },
  { value: '#22C55E', label: 'Green' },
  { value: '#EAB308', label: 'Yellow' },
  { value: '#EF4444', label: 'Red' },
  { value: '#6366F1', label: 'Purple' },
  { value: '#06B6D4', label: 'Cyan' },
]

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [visibility, setVisibility] = useState('')

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-5">Create New Project</h2>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter project title..."
              className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter project title..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Project Color</label>
            <div className="flex gap-2">
              {projectColors.map(c => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-xl transition-transform ${color === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Visibility</label>
            <div className="relative">
              <select
                value={visibility}
                onChange={e => setVisibility(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer"
              >
                <option value="" disabled>Enter project title...</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="team">Team Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 border border-gray-200 rounded-xl h-11 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              disabled={!title.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl h-11 text-sm font-semibold transition-colors">
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── My Projects Page ─────────────────────────────────────────────────────────

function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorite, setFavorite] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div>
      {showCreateModal && <CreateProjectModal onClose={() => setShowCreateModal(false)} />}
      <PageHeader
        title="My Projects"
        subtitle="Manage your projects and workflows"
        action={
          <button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
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
          <BarChart2 className="h-4 w-4" />Analytics
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

function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const [taskName, setTaskName] = useState('')
  const [project, setProject] = useState('')
  const projects = Array.from(new Set(sampleTasks.filter(t => t.project).map(t => t.project!)))

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="p-6">
          <h2 className="text-xl font-black text-gray-900 mb-5">Create New Task</h2>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project</label>
            <div className="relative">
              <select
                value={project}
                onChange={e => setProject(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer"
              >
                <option value="">Select Project</option>
                {projects.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 border border-gray-200 rounded-xl h-11 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              disabled={!taskName.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl h-11 text-sm font-semibold transition-colors">
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TasksPage() {
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [projectFilter, setProjectFilter] = useState('All Projects')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const projects = ['All Projects', ...Array.from(new Set(sampleTasks.filter(t => t.project).map(t => t.project!)))]
  const statuses = ['All Statuses', 'Working on it', 'Not Started', 'Done']
  const filtered = sampleTasks.filter(t => {
    const matchStatus = statusFilter === 'All Statuses' || statusConfig[t.status].label === statusFilter
    const matchProject = projectFilter === 'All Projects' || t.project === projectFilter
    return matchStatus && matchProject
  })
  return (
    <div>
      {showCreateModal && <CreateTaskModal onClose={() => setShowCreateModal(false)} />}
      <PageHeader title="My Tasks" subtitle="All your assigned tasks across projects"
        action={
          <button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
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
            <div key={task.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              <StatusIcon status={task.status} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">{task.title}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {task.project && (
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{task.project}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />{task.date}
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

// ─── Invite Team Members Modal ────────────────────────────────────────────────

function InviteTeamModal({ onClose }: { onClose: () => void }) {
  const [emailInput, setEmailInput] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')

  const addEmail = () => {
    const trimmed = emailInput.trim()
    if (trimmed && !emails.includes(trimmed)) {
      setEmails(prev => [...prev, trimmed])
      setEmailInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addEmail() }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-black text-gray-900">Invite Team Members</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">Send invitations to team members to join your projekx workspace.</p>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Addresses</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."
                className="flex-1 border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
              <button onClick={addEmail}
                className="w-11 h-11 bg-gray-600 hover:bg-gray-700 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {emails.map(e => (
                  <span key={e} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {e}
                    <button onClick={() => setEmails(prev => prev.filter(x => x !== e))} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
            <div className="relative">
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer"
              >
                <option value="">Choose an option...</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Personal Message (Optional)</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Add a personal message to the invitation..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 border border-gray-200 rounded-xl h-11 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              disabled={emails.length === 0}
              className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white rounded-xl h-11 text-sm font-semibold transition-colors">
              Send {emails.length} Invitation{emails.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Team Members Page ────────────────────────────────────────────────────────

function TeamPage({ user }: { user: User }) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <div>
      {showInviteModal && <InviteTeamModal onClose={() => setShowInviteModal(false)} />}
      <PageHeader title="Team Members" subtitle="Collaborate with your team members and track their contributions"
        action={
          <button onClick={() => setShowInviteModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
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
          <option>All Roles</option><option>Admin</option><option>Member</option><option>Viewer</option>
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
            <Users className="h-4 w-4" />View Profile
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Page ───────────────────────────────────────────────────────────

function AnalyticsPage() {
  const statCards = [
    { label: 'Total Tasks',      value: '0',  sub: 'Active tasks tracked', icon: CheckCircle2, bg: 'bg-blue-500' },
    { label: 'Completion Rate',  value: '0%', sub: null,                   icon: CheckCircle2, bg: 'bg-green-500', progress: true },
    { label: 'Overdue Tasks',    value: '0',  sub: 'Need attention',       icon: Clock,        bg: 'bg-red-500' },
    { label: 'Active Projects',  value: '0',  sub: 'Projects in use',      icon: Folder,       bg: 'bg-purple-500' },
  ]
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">Analytics Dashboard</h2>
      <p className="text-sm text-gray-400 mb-6">Insights and metrics across your projects and tasks</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5">
        {statCards.map(({ label, value, sub, icon: Icon, bg, progress }) => (
          <div key={label} className={`${bg} rounded-2xl p-5 text-white flex flex-col gap-2`}>
            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              <Icon className="h-4 w-4 flex-shrink-0" /> {label}
            </div>
            <p className="text-4xl font-black leading-none">{value}</p>
            {progress ? (
              <div className="w-full bg-white/30 rounded-full h-2 mt-1">
                <div className="bg-white rounded-full h-2" style={{ width: '1%' }} />
              </div>
            ) : (
              <p className="text-white/75 text-xs">{sub}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-gray-900 mb-1 text-sm">
            <Activity className="h-5 w-5 text-blue-500 flex-shrink-0" />
            Task Status Distribution
          </div>
          <EmptyState icon={BarChart2} title="No data available" desc="Complete tasks to see status distribution" />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-gray-900 mb-1 text-sm">
            <TrendingUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
            Priority Distribution
          </div>
          <EmptyState icon={TrendingUp} title="No data available" desc="Add tasks with priorities to see distribution" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-gray-900 mb-1 text-sm">
          <BarChart2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          Project Performance
        </div>
        <EmptyState icon={BarChart2} title="No project data" desc="Create projects and complete tasks to see performance metrics" />
      </div>
    </div>
  )
}

// ─── Templates Page ───────────────────────────────────────────────────────────

function TemplatesPage() {
  return (
    <div>
      <HeroHeader icon={LayoutTemplate} title="Project Templates"
        subtitle="Start your projects faster with our professionally designed templates" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search templates..."
            className="w-full bg-gray-50 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 h-10 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer min-w-[160px]">
          <option value="">Choose an option...</option>
          <option>Engineering</option>
          <option>Product</option>
          <option>Marketing</option>
          <option>Operations</option>
        </select>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <LayoutTemplate className="h-14 w-14 text-gray-300 mb-3" />
        <h3 className="font-bold text-gray-700 mb-1">No templates found</h3>
        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
      </div>
    </div>
  )
}

// ─── Community Page ───────────────────────────────────────────────────────────

const communityPosts = [
  { id: 1, category: 'Success Stories', trending: true, title: 'title', body: 'discussion about this project...', author: 'BALA MUTHUKUMARAN A', date: 'May 19, 2026', likes: 3, dislikes: 0, comments: 1 },
]

function CommunityPage() {
  const [tab, setTab] = useState('All')
  const [sortTab, setSortTab] = useState('Recent')
  const tabs = ['All', 'Success Stories', 'Feature Requests', 'General', 'Project Management', 'Tools & Software', 'Communication']
  const sortTabs = [
    { label: 'Recent',   icon: Clock },
    { label: 'Trending', icon: TrendingUp },
    { label: 'Popular',  icon: ThumbsUp },
  ]

  return (
    <div>
      <HeroHeader icon={Users} title="Projekx Community"
        subtitle="Connect with other project managers, share experiences, and learn from the community." />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search discussions..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 h-10 rounded-xl flex items-center gap-2 transition-colors flex-shrink-0">
          <Plus className="h-4 w-4" /> Start Discussion
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-none">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              tab === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex mb-4 overflow-hidden">
        {sortTabs.map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => setSortTab(label)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-r last:border-0 border-gray-100 ${
              sortTab === label ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400 hover:bg-white hover:text-gray-700'
            }`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {communityPosts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{post.category}</span>
                {post.trending && (
                  <span className="text-xs font-semibold bg-orange-50 text-orange-500 px-2.5 py-0.5 rounded-full">🔥 Trending</span>
                )}
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{post.body}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100 pt-3">
              <span className="text-xs text-gray-400">By {post.author} &nbsp; {post.date}</span>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsUp className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsDown className="h-4 w-4" /> {post.dislikes}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <MessageCircle className="h-4 w-4" /> {post.comments}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

const blogPosts = [
  { id: 1, category: 'Best Practices', date: 'May 19, 2026', title: 'success', subtitle: 'Best Tech Learner', author: 'BALA MUTHUKUMARAN A' },
]

function BlogPage({ user }: { user: User }) {
  const [tab, setTab] = useState('All')
  const tabs = ['All', 'Tutorial', 'Best Practices', 'Technology']

  return (
    <div>
      <HeroHeader icon={Users} title="Projekx Blog"
        subtitle="Insights, tips, and best practices for project management and team collaboration." />

      <div className="flex items-center gap-3 mb-6 max-w-2xl mx-auto">
        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <input type="text" placeholder="What's on your mind?"
          className="flex-1 bg-white border border-gray-200 rounded-full px-5 h-11 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Search discussions..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                tab === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-100" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{post.category}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">{post.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{post.subtitle}</p>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">By {post.author}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                  Read More
                </button>
              </div>
            </div>
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

interface ApiEndpoint {
  id: string; method: string; label: string; path: string; title: string; description: string
  params?: { name: string; type: string; required: boolean; desc: string }[]
  request?: string; response?: string
}

const apiNav: { group: string; endpoints: ApiEndpoint[] }[] = [
  {
    group: 'AUTHENTICATION',
    endpoints: [{
      id: 'auth-login', method: 'POST', label: 'Login', path: '/api/v1/auth/login',
      title: 'Login',
      description: 'Authenticates a user with email and password. Returns a JWT access token used for all subsequent authenticated requests.',
      params: [
        { name: 'email',    type: 'string', required: true, desc: "The user's registered email address." },
        { name: 'password', type: 'string', required: true, desc: "The user's account password. Minimum 8 characters." },
      ],
      request: `curl -X POST https://api.projekxhub.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "yourpassword123"
  }'`,
      response: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "refresh_token": "rt_9f8a7b6c5d4e3f2a1b0c",
  "expires_in": 3600,
  "user": {
    "id": "us_1f3a2b",
    "email": "user@example.com",
    "name": "Robb Johnson"
  }
}`,
    }],
  },
  {
    group: 'PROJECTS',
    endpoints: [
      { id: 'get-projects',  method: 'GET',    label: 'List projects',   path: '/api/v1/projects',     title: 'List Projects',   description: 'Returns all projects in your workspace.', params: [], request: 'curl -X GET https://api.projekxhub.com/v1/projects \\\n  -H "Authorization: Bearer <token>"', response: '[{"id":"proj_1","name":"My Project","status":"active"}]' },
      { id: 'post-project',  method: 'POST',   label: 'Create project',  path: '/api/v1/projects',     title: 'Create Project',  description: 'Creates a new project in your workspace.', params: [{ name: 'name', type: 'string', required: true, desc: 'The project name.' }], request: 'curl -X POST https://api.projekxhub.com/v1/projects \\\n  -H "Authorization: Bearer <token>"', response: '{"id":"proj_new","name":"New Project","status":"active"}' },
      { id: 'get-project',   method: 'GET',    label: 'Get project',     path: '/api/v1/projects/:id', title: 'Get Project',     description: 'Returns a specific project by its ID.', params: [], request: 'curl -X GET https://api.projekxhub.com/v1/projects/proj_1 \\\n  -H "Authorization: Bearer <token>"', response: '{"id":"proj_1","name":"My Project","status":"active"}' },
      { id: 'patch-project', method: 'PATCH',  label: 'Update project',  path: '/api/v1/projects/:id', title: 'Update Project',  description: "Updates a project's name or status.", params: [{ name: 'name', type: 'string', required: false, desc: 'New project name.' }], request: 'curl -X PATCH https://api.projekxhub.com/v1/projects/proj_1 \\\n  -H "Authorization: Bearer <token>"', response: '{"id":"proj_1","name":"Updated Project"}' },
      { id: 'del-project',   method: 'DELETE', label: 'Delete project',  path: '/api/v1/projects/:id', title: 'Delete Project',  description: 'Permanently deletes a project and all its tasks.', params: [], request: 'curl -X DELETE https://api.projekxhub.com/v1/projects/proj_1 \\\n  -H "Authorization: Bearer <token>"', response: '{"message":"Project deleted successfully"}' },
    ],
  },
  {
    group: 'TASKS',
    endpoints: [
      { id: 'get-tasks',  method: 'GET',  label: 'List tasks',    path: '/api/v1/tasks', title: 'List Tasks',   description: 'Returns all tasks with optional filters.', params: [], request: 'curl -X GET https://api.projekxhub.com/v1/tasks \\\n  -H "Authorization: Bearer <token>"', response: '[{"id":"task_1","title":"My Task","status":"working"}]' },
      { id: 'post-task',  method: 'POST', label: 'Create Tasks',  path: '/api/v1/tasks', title: 'Create Task',  description: 'Creates a new task in a project.', params: [{ name: 'title', type: 'string', required: true, desc: 'The task title.' }, { name: 'project_id', type: 'string', required: true, desc: 'ID of the parent project.' }], request: 'curl -X POST https://api.projekxhub.com/v1/tasks \\\n  -H "Authorization: Bearer <token>"', response: '{"id":"task_new","title":"New Task","status":"notstarted"}' },
    ],
  },
  {
    group: 'TEAMS',
    endpoints: [
      { id: 'post-member', method: 'POST', label: 'Add member', path: '/api/v1/teams/members', title: 'Add Team Member', description: 'Invites a new member to the workspace by email.', params: [{ name: 'email', type: 'string', required: true, desc: "Member's email address." }], request: 'curl -X POST https://api.projekxhub.com/v1/teams/members \\\n  -H "Authorization: Bearer <token>"', response: '{"message":"Invitation sent successfully"}' },
    ],
  },
  {
    group: 'ANALYTICS',
    endpoints: [
      { id: 'get-analytics', method: 'GET', label: 'Overview', path: '/api/v1/analytics', title: 'Analytics Overview', description: 'Returns workspace analytics including task counts and completion rates.', params: [], request: 'curl -X GET https://api.projekxhub.com/v1/analytics \\\n  -H "Authorization: Bearer <token>"', response: '{"totalProjects":0,"totalTasks":0,"completionRate":0,"activeMembers":1}' },
    ],
  },
]

function ApiDocsPage() {
  const [selectedId, setSelectedId] = useState('auth-login')
  const allEndpoints = apiNav.flatMap(g => g.endpoints)
  const selected = allEndpoints.find(e => e.id === selectedId) ?? allEndpoints[0]

  return (
    <div>
      <HeroHeader icon={Code2} title="API Documentation"
        subtitle="Integrate projekx into your applications with our comprehensive REST API. Build powerful project management experiences for your users." />

      <div className="flex flex-col lg:flex-row gap-4 min-h-[500px]">
        {/* Left nav */}
        <div className="lg:w-52 flex-shrink-0 space-y-4">
          {apiNav.map(({ group, endpoints }) => (
            <div key={group}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{group}</p>
              <div className="space-y-0.5">
                {endpoints.map(ep => (
                  <button key={ep.id} onClick={() => setSelectedId(ep.id)}
                    className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${
                      selectedId === ep.id ? 'bg-blue-50' : 'hover:bg-gray-100'
                    }`}>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${methodBadge[ep.method === 'DELETE' ? 'DEL' : ep.method]}`}>
                      {ep.method === 'DELETE' ? 'DEL' : ep.method}
                    </span>
                    <span className={`text-sm truncate ${selectedId === ep.id ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
                      {ep.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right content */}
        {selected && (
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 overflow-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-2.5 py-1 rounded ${methodBadge[selected.method === 'DELETE' ? 'DEL' : selected.method]}`}>
                {selected.method}
              </span>
              <code className="text-sm text-gray-700 font-mono bg-gray-100 px-3 py-1 rounded-lg">{selected.path}</code>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{selected.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{selected.description}</p>

            {selected.params && selected.params.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Body Parameters</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {selected.params.map(p => (
                    <div key={p.name} className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-bold text-sm text-gray-900">{p.name}</span>
                        <span className="text-xs text-gray-400">{p.type}</span>
                        {p.required && <span className="text-xs font-bold text-red-500">required</span>}
                      </div>
                      <p className="text-xs text-gray-500">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selected.request && (
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Request</p>
                <pre className="bg-gray-900 text-green-400 text-xs font-mono rounded-xl p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">{selected.request}</pre>
              </div>
            )}

            {selected.response && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Response 200</p>
                <pre className="bg-gray-900 text-blue-300 text-xs font-mono rounded-xl p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">{selected.response}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Tutorials Page ───────────────────────────────────────────────────────────

const tutorialVideos = [
  {
    videoId: 'QV-39PBMW6Q',
    title: 'projekx - An Easy-To-Use SAAS Tool For Project Management',
    desc: 'One-liner: Projekx is an easy-to-use SAAS tool for project management.',
    date: 'Sep 7',
    category: 'Tutorial',
  },
  {
    videoId: 'u8DvLB3D290',
    title: 'projekx - Setting a Due Date for Your Task in projekx',
    desc: 'Learn the fundamentals of effective project management and how to organize your team for success.',
    date: 'Sep 7',
    category: 'Tutorial',
  },
  {
    videoId: 'QV-39PBMW6Q',
    title: 'projekx - Project Progress Tracker in projekx',
    desc: 'Track your project progress in real-time using our powerful built-in dashboard tools.',
    date: 'Sep 7',
    category: 'Tutorial',
  },
  {
    videoId: 'u8DvLB3D290',
    title: 'projekx - Organizing Tasks with Color Coding in projekx',
    desc: 'Learn how to organize and prioritize your tasks using color coding for better visibility.',
    date: 'Sep 7',
    category: 'Tutorial',
  },
]

const tutorialCategories: { label: string; icon: LucideIcon }[] = [
  { label: 'Learning',           icon: GraduationCap },
  { label: 'Project Management', icon: ClipboardList },
  { label: 'Tasks',              icon: CheckSquare },
  { label: 'Projects',           icon: LayoutGrid },
  { label: 'Team',               icon: UserIcon },
  { label: 'Analytics',          icon: BarChart2 },
  { label: 'Templates',          icon: LayoutTemplate },
  { label: 'Collaboration',      icon: Share2 },
  { label: 'Files',              icon: File },
  { label: 'Chat',               icon: MessageSquare },
]

function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState('Learning')

  return (
    <div>
      <HeroHeader icon={BookOpen} title="Video Tutorials"
        subtitle="Master projekx with our comprehensive video tutorials. From basic setup to advanced techniques, we've got you covered." />

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search tutorials..."
                className="w-full bg-gray-50 rounded-xl pl-9 pr-3 h-10 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <p className="font-bold text-gray-900 text-sm mb-3">Categories</p>
            <div className="space-y-0.5">
              {tutorialCategories.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => setActiveCategory(label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    activeCategory === label ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video grid */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {tutorialVideos.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.videoId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{v.category}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" /> {v.date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{v.desc}</p>
                <a href={`https://youtu.be/${v.videoId}`} target="_blank" rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Play className="h-4 w-4" /> Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Support Page ─────────────────────────────────────────────────────────────

function SupportPage() {
  const contacts = [
    { icon: PhoneCall, label: 'Live Chat',  detail: '+13152773691' },
    { icon: Mail,      label: 'Email',      detail: 'support@projekxhub.com' },
    { icon: Phone,     label: 'Call',       detail: '+13152773691' },
  ]

  return (
    <div>
      <HeroHeader icon={PhoneCall} title="Support" subtitle="Support Description" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {contacts.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
            <Icon className="h-10 w-10 text-blue-700 mb-4" strokeWidth={1.5} />
            <h3 className="font-bold text-gray-900 text-base mb-1">{label}</h3>
            <p className="text-sm text-gray-500">{detail}</p>
          </div>
        ))}
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

// ─── Settings Page ────────────────────────────────────────────────────────────

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailUpdates: false,
    pushNotifications: false,
    taskReminders: false,
    projectUpdates: false,
  })
  const [profileVisibility, setProfileVisibility] = useState('')
  const [activityVisibility, setActivityVisibility] = useState('')
  const [theme, setTheme] = useState('Light')
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('UTC')

  const socialConnections = [
    { name: 'Facebook', status: 'Connected', icon: Globe,           iconColor: 'text-blue-600' },
    { name: 'Linkedin', status: 'Connected', icon: UserIcon,        iconColor: 'text-blue-700' },
    { name: 'GitHub',   status: 'Connected', icon: Code2,           iconColor: 'text-gray-800' },
    { name: 'Redit',    status: 'Connected', icon: MessageCircle,   iconColor: 'text-orange-500' },
  ]

  const notificationItems: { key: keyof typeof notifications; label: string; desc: string }[] = [
    { key: 'emailUpdates',      label: 'Email Updates',       desc: 'Receive email notifications for important updates' },
    { key: 'pushNotifications', label: 'Push Notifications',  desc: 'Get notified about activity in your browser' },
    { key: 'taskReminders',     label: 'Task Reminders',      desc: 'Get reminded about upcoming deadlines' },
    { key: 'projectUpdates',    label: 'Project Updates',     desc: 'Notifications when projects are updated' },
  ]

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">Settings</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account preferences and privacy settings</p>
      </div>

      {/* Social Connections */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Link2 className="h-4 w-4 text-gray-700" />
          <h3 className="font-bold text-gray-900">Social Connections</h3>
        </div>
        <p className="text-sm text-gray-400 mb-5">Connect your social media accounts to share projects and sync data.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {socialConnections.map(({ name, status, icon: Icon, iconColor }, i) => (
            <div key={name} className={`flex items-center justify-between py-4 ${i % 2 === 0 ? 'md:pr-8 border-b md:border-b-0' : 'md:pl-8 md:border-l border-gray-100 border-b last:border-b-0'} border-gray-100`}>
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{status}</p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-gray-700" />
          <h3 className="font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {notificationItems.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${notifications[key] ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="h-4 w-4 text-gray-700" />
          <h3 className="font-bold text-gray-900">Privacy</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="pb-5">
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Profile Visibility</p>
            <p className="text-xs text-gray-400 mb-3">Control who can see your profile information</p>
            <div className="relative">
              <select value={profileVisibility} onChange={e => setProfileVisibility(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer">
                <option value="">Choose an option...</option>
                <option value="public">Public</option>
                <option value="friends">Friends only</option>
                <option value="private">Private</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="pt-5">
            <p className="text-sm font-semibold text-gray-900 mb-0.5">Activity Visibility</p>
            <p className="text-xs text-gray-400 mb-3">Control who can see your activity</p>
            <div className="relative">
              <select value={activityVisibility} onChange={e => setActivityVisibility(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer">
                <option value="">Choose an option...</option>
                <option value="public">Public</option>
                <option value="friends">Friends only</option>
                <option value="private">Private</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Settings className="h-4 w-4 text-gray-700" />
          <h3 className="font-bold text-gray-900">Preferences</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Theme</p>
            <div className="relative">
              <select value={theme} onChange={e => setTheme(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Language</p>
            <div className="relative">
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-2">Timezone</p>
          <div className="relative">
            <select value={timezone} onChange={e => setTimezone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer">
              <option>UTC</option>
              <option>GMT</option>
              <option>EST</option>
              <option>PST</option>
              <option>IST</option>
              <option>CET</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
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
    case 'blog':          return <BlogPage user={user} />
    case 'integrations':  return <IntegrationsPage />
    case 'api':           return <ApiDocsPage />
    case 'tutorials':     return <TutorialsPage />
    case 'support':       return <SupportPage />
    case 'settings':      return <SettingsPage />
    default:              return <DashboardHome user={user} />
  }
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function DashboardPage({ navigate }: Props) {
  const [activeNav, setActiveNav] = useState(() => {
    const section = new URLSearchParams(window.location.search).get('section')
    const validIds = [...allNav.map(n => n.id), 'settings']
    return (section && validIds.includes(section)) ? section : 'dashboard'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const user = getCurrentUser()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) { navigate('login'); return null }

  const handleNav = (id: string) => {
    setActiveNav(id)
    setSidebarOpen(false)
    const params = new URLSearchParams(window.location.search)
    params.set('section', id)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }
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
          <button onClick={() => navigate('landing')} className="flex items-center">
            <img src="/logo/1.avif" alt="projekx" className="h-9 w-auto" />
          </button>
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
              <Icon className="h-4 w-4 flex-shrink-0" />{label}
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
              <Icon className="h-4 w-4 flex-shrink-0" />{label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors text-left">
            <LogOut className="h-4 w-4 flex-shrink-0" />Logout
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
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-violet-300 transition-all select-none">
                {user.firstName[0]}{user.lastName[0]}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setProfileOpen(false); handleNav('settings') }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      <Settings className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      Settings
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); handleNav('support') }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                      <HelpCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      Help
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="h-4 w-4 flex-shrink-0" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
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
