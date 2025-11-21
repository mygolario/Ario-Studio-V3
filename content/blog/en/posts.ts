import type { BlogPost } from '../types'

/**
 * Blog posts for English locale
 * 
 * This is a placeholder content structure that can later be moved to a CMS.
 * For now, we use TypeScript config objects.
 */

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-assisted-web-design',
    locale: 'en',
    title: 'How AI Assists (But Doesn\'t Replace) Web Design',
    excerpt: 'Exploring how Ario Studio uses AI as a powerful assistant for speed and exploration, while keeping human strategy and design decisions at the core.',
    date: '2024-01-15',
    tags: ['AI', 'Web Design', 'Process'],
    content: `# How AI Assists (But Doesn't Replace) Web Design

At Ario Studio, we believe AI is a powerful tool that enhances our workflow, not a replacement for human creativity and strategy.

## AI as an Assistant

We use AI to:
- Speed up repetitive tasks
- Explore design variations quickly
- Generate code snippets and boilerplate
- Automate testing and quality checks

## Human Strategy Remains Core

However, every design decision, strategic choice, and final quality check is done by humans. We don't use "one-click AI website generators" because every project is unique and requires custom thinking.

## The Best of Both Worlds

By combining AI efficiency with human expertise, we deliver faster results without sacrificing quality or strategic depth.`,
    coverImageUrl: undefined,
  },
  {
    id: '2',
    slug: 'cinematic-web-experiences',
    locale: 'en',
    title: 'Building Cinematic Web Experiences',
    excerpt: 'What makes a web experience "cinematic"? We explore the principles of motion, storytelling, and visual hierarchy that create memorable digital experiences.',
    date: '2024-01-10',
    tags: ['Design', 'UX', 'Animation'],
    content: `# Building Cinematic Web Experiences

Cinematic web design goes beyond static pages. It's about creating experiences that feel like they're telling a story.

## Motion and Flow

Smooth animations and transitions guide users through the narrative. Every scroll, hover, and interaction contributes to the overall experience.

## Visual Hierarchy

Like a film director frames a shot, we carefully compose each section to draw attention where it matters most.

## Emotional Connection

Cinematic design aims to create an emotional connection with visitors, making them feel something, not just see something.

## Modern Tools

We use Next.js, Framer Motion, and GSAP to bring these cinematic experiences to life while maintaining performance.`,
    coverImageUrl: undefined,
  },
]

