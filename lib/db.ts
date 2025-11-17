import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client Singleton
 * 
 * Prevents multiple instances of PrismaClient in development
 * due to hot-reloading creating new instances.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

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

export async function updateLead(id: string, data: { status?: string; internalNotes?: string }) {
  return await prisma.lead.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status }),
      ...(data.internalNotes !== undefined && { internalNotes: data.internalNotes }),
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
  statusCounts.forEach((item) => {
    statusMap[item.status] = item._count.id
  })

  return {
    total,
    new: newLeads,
    last7Days,
    byStatus: statusMap,
  }
}

