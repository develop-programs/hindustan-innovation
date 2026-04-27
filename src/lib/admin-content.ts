import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

import type { BlogPost, Category } from '@/lib/blog-utils';
import type { CTABannerData, Department, HeroData } from '@/lib/careers-utils';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_SESSION_KEY = 'hindustan-admin-session';
export const ADMIN_TOKEN = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64');

const BLOG_FILE_PATH = path.join(process.cwd(), 'src', 'blog.json');
const CAREERS_FILE_PATH = path.join(process.cwd(), 'src', 'careers.json');

export interface BlogStore {
  hero: {
    pill: string;
    heading: string;
    headingItalic: string;
    subheading: string;
  };
  categories: Category[];
  posts: BlogPost[];
}

export interface CareersStore {
  hero: HeroData;
  ctaBanner: CTABannerData;
  departments: Department[];
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fileContents = await readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function loadBlogStore(): Promise<BlogStore> {
  return readJsonFile<BlogStore>(BLOG_FILE_PATH);
}

export async function saveBlogStore(store: BlogStore): Promise<void> {
  await writeJsonFile(BLOG_FILE_PATH, store);
}

export async function loadCareersStore(): Promise<CareersStore> {
  return readJsonFile<CareersStore>(CAREERS_FILE_PATH);
}

export async function saveCareersStore(store: CareersStore): Promise<void> {
  await writeJsonFile(CAREERS_FILE_PATH, store);
}

export function isAdminTokenValid(token: string | null): boolean {
  return token === ADMIN_TOKEN;
}

export function getAdminToken(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64');
}