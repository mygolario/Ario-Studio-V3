import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'

/**
 * Prisma Client Singleton with Accelerate and Optimize (Edge)
 * 
 * Prevents multiple instances of PrismaClient in development
 * due to hot-reloading creating new instances.
 * 
 * Uses Prisma Accelerate for connection pooling and caching
 * when DATABASE_URL uses prisma:// or prisma+postgres:// protocol.
 * 
 * Uses Prisma Optimize for query analysis and optimization
 * when OPTIMIZE_API_KEY is available.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

function createPrismaClient() {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  // Use Accelerate extension if DATABASE_URL uses Prisma Accelerate protocol
  const dbUrl = process.env.DATABASE_URL || ''
  const useAccelerate = dbUrl.startsWith('prisma://') || dbUrl.startsWith('prisma+postgres://')
  const useOptimize = !!process.env.OPTIMIZE_API_KEY

  let client = baseClient

  // Apply extensions conditionally (can be chained)
  if (useAccelerate) {
    client = client.$extends(withAccelerate()) as any
  }

  if (useOptimize) {
    client = client.$extends(
      withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
    ) as any
  }

  return client as unknown as PrismaClient
}

export const prisma = (globalForPrisma.prisma ?? createPrismaClient()) as PrismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Data Access Layer
 * 
 * Helper functions for querying the database.
 * These functions will be used to make homepage sections dynamic.
 */

// ==================== Services ====================

export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getServiceBySlug(slug: string) {
  return await prisma.service.findUnique({
    where: { slug },
  })
}

// ==================== Projects ====================

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getFeaturedProjects() {
  return await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { order: 'asc' },
  })
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
  })
}

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  })
}

export interface CreateProjectInput {
  title: string
  slug?: string
  shortDescription: string
  longDescription?: string
  tags?: string[]
  thumbnailUrl?: string
  heroImageUrl?: string
  year?: number
  clientName?: string
  role?: string
  liveUrl?: string
  isFeatured?: boolean
  order?: number
}

export interface UpdateProjectInput {
  title?: string
  slug?: string
  shortDescription?: string
  longDescription?: string
  tags?: string[]
  thumbnailUrl?: string
  heroImageUrl?: string
  year?: number
  clientName?: string
  role?: string
  liveUrl?: string
  isFeatured?: boolean
  order?: number
}

export async function createProject(data: CreateProjectInput) {
  return await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug || '',
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      tags: data.tags || [],
      thumbnailUrl: data.thumbnailUrl,
      heroImageUrl: data.heroImageUrl,
      year: data.year,
      clientName: data.clientName,
      role: data.role,
      liveUrl: data.liveUrl,
      isFeatured: data.isFeatured || false,
      order: data.order || 100,
    },
  })
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  return await prisma.project.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.shortDescription && { shortDescription: data.shortDescription }),
      ...(data.longDescription !== undefined && { longDescription: data.longDescription }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
      ...(data.heroImageUrl !== undefined && { heroImageUrl: data.heroImageUrl }),
      ...(data.year !== undefined && { year: data.year }),
      ...(data.clientName !== undefined && { clientName: data.clientName }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
      ...(data.order !== undefined && { order: data.order }),
    },
  })
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  })
}

// ==================== Blog Posts ====================

export async function getPublishedBlogPosts() {
  return await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  })
}

export async function getBlogPostBySlug(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug },
  })
}

export async function getAllBlogPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getBlogPostById(id: string) {
  return await prisma.blogPost.findUnique({
    where: { id },
  })
}

export interface CreateBlogPostInput {
  title: string
  slug?: string
  excerpt: string
  content: string
  coverImageUrl?: string
  tags?: string[]
  status?: string
  publishedAt?: Date
}

export interface UpdateBlogPostInput {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  coverImageUrl?: string
  tags?: string[]
  status?: string
  publishedAt?: Date
}

export async function createBlogPost(data: CreateBlogPostInput) {
  return await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug || '',
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      tags: data.tags || [],
      status: data.status || 'draft',
      publishedAt: data.publishedAt,
    },
  })
}

export async function updateBlogPost(id: string, data: UpdateBlogPostInput) {
  return await prisma.blogPost.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.excerpt && { excerpt: data.excerpt }),
      ...(data.content && { content: data.content }),
      ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.publishedAt !== undefined && { publishedAt: data.publishedAt }),
    },
  })
}

export async function deleteBlogPost(id: string) {
  return await prisma.blogPost.delete({
    where: { id },
  })
}

// ==================== Case Studies ====================

export async function getPublishedCaseStudies() {
  return await prisma.caseStudy.findMany({
    where: { status: 'published' },
    include: { project: true },
    orderBy: { publishedAt: 'desc' },
  })
}

export async function getCaseStudyBySlug(slug: string) {
  return await prisma.caseStudy.findUnique({
    where: { slug },
    include: { project: true },
  })
}

export async function getCaseStudyByProjectId(projectId: string) {
  return await prisma.caseStudy.findFirst({
    where: { 
      projectId,
      status: 'published',
    },
    include: { project: true },
  })
}

export async function getAllCaseStudies() {
  return await prisma.caseStudy.findMany({
    include: { project: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCaseStudyById(id: string) {
  return await prisma.caseStudy.findUnique({
    where: { id },
    include: { project: true },
  })
}

export interface CreateCaseStudyInput {
  projectId: string
  slug?: string
  title: string
  heroImageUrl?: string
  summary: string
  challenge: string
  solution: string
  results: string
  metrics?: any
  content?: string
  status?: string
  publishedAt?: Date
}

export interface UpdateCaseStudyInput {
  projectId?: string
  slug?: string
  title?: string
  heroImageUrl?: string
  summary?: string
  challenge?: string
  solution?: string
  results?: string
  metrics?: any
  content?: string
  status?: string
  publishedAt?: Date
}

export async function createCaseStudy(data: CreateCaseStudyInput) {
  return await prisma.caseStudy.create({
    data: {
      projectId: data.projectId,
      slug: data.slug || '',
      title: data.title,
      heroImageUrl: data.heroImageUrl,
      summary: data.summary,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      metrics: data.metrics,
      content: data.content,
      status: data.status || 'draft',
      publishedAt: data.publishedAt,
    },
  })
}

export async function updateCaseStudy(id: string, data: UpdateCaseStudyInput) {
  return await prisma.caseStudy.update({
    where: { id },
    data: {
      ...(data.projectId && { projectId: data.projectId }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.title && { title: data.title }),
      ...(data.heroImageUrl !== undefined && { heroImageUrl: data.heroImageUrl }),
      ...(data.summary && { summary: data.summary }),
      ...(data.challenge && { challenge: data.challenge }),
      ...(data.solution && { solution: data.solution }),
      ...(data.results && { results: data.results }),
      ...(data.metrics !== undefined && { metrics: data.metrics }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.publishedAt !== undefined && { publishedAt: data.publishedAt }),
    },
  })
}

export async function deleteCaseStudy(id: string) {
  return await prisma.caseStudy.delete({
    where: { id },
  })
}

// ==================== Process Steps ====================

export async function getProcessSteps() {
  return await prisma.processStep.findMany({
    orderBy: { order: 'asc' },
  })
}

// ==================== Highlights ====================

export async function getHighlights(type?: string) {
  const where = type ? { type } : undefined
  return await prisma.highlight.findMany({
    where,
    orderBy: { order: 'asc' },
  })
}

// ==================== Leads ====================

export interface CreateLeadInput {
  name: string
  email: string
  companyName?: string
  budgetRange?: string
  timeline?: string
  servicesNeeded?: string[]
  message: string
  source: string
  status?: string
  aiSummary?: string
  aiTags?: string[]
  aiPriorityScore?: number
  aiNotes?: string
}

export async function createLead(data: CreateLeadInput) {
  return await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      servicesNeeded: data.servicesNeeded || [],
      message: data.message,
      source: data.source,
      status: data.status || 'new',
      aiSummary: data.aiSummary,
      aiTags: data.aiTags || [],
      aiPriorityScore: data.aiPriorityScore,
      aiNotes: data.aiNotes,
    },
  })
}

export async function getLeads(status?: string) {
  const where = status ? { status } : undefined
  return await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getLeadById(id: string) {
  return await prisma.lead.findUnique({
    where: { id },
  })
}

export async function updateLeadStatus(id: string, status: string, internalNotes?: string) {
  return await prisma.lead.update({
    where: { id },
    data: {
      status,
      internalNotes,
    },
  })
}

export async function updateLead(
  id: string,
  data: {
    status?: string
    internalNotes?: string
    aiSummary?: string
    aiTags?: string[]
    aiPriorityScore?: number
    aiNotes?: string
  }
) {
  return await prisma.lead.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status }),
      ...(data.internalNotes !== undefined && { internalNotes: data.internalNotes }),
      ...(data.aiSummary !== undefined && { aiSummary: data.aiSummary }),
      ...(data.aiTags !== undefined && { aiTags: data.aiTags }),
      ...(data.aiPriorityScore !== undefined && { aiPriorityScore: data.aiPriorityScore }),
      ...(data.aiNotes !== undefined && { aiNotes: data.aiNotes }),
    },
  })
}

export async function getLeadStats() {
  const [total, newLeads, last7Days] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ])

  // Count by status
  const statusCounts = await prisma.lead.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  const statusMap: Record<string, number> = {}
  ;(statusCounts as Array<{ status: string; _count: { id: number } }>).forEach((item) => {
    statusMap[item.status] = item._count.id
  })

  return {
    total,
    new: newLeads,
    last7Days,
    byStatus: statusMap,
  }
}

