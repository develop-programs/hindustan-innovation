/**
 * Example Implementation of Blog API Usage
 * 
 * This file demonstrates how to use the Blog API endpoints in React components
 * and utility functions. Copy and adapt patterns for your specific needs.
 */

// ============================================
// EXAMPLE 1: Fetching All Blogs
// ============================================

export async function getAllBlogsExample() {
  try {
    const response = await fetch('/api/blogs');
    const data = await response.json();

    if (data.success) {
      console.log('All blogs:', data.data);
      console.log('Total posts:', data.total);
      console.log('Current page:', data.page);
      return data.data;
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }
}

// ============================================
// EXAMPLE 2: Fetching Blogs by Category
// ============================================

export async function getBlogsByCategoryExample(category: string) {
  try {
    const response = await fetch(`/api/blogs?category=${category}`);
    const data = await response.json();

    if (data.success) {
      console.log(`Blogs in ${category}:`, data.data);
      console.log(`Total in category:`, data.total);
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching category blogs:', error);
  }
}

// ============================================
// EXAMPLE 3: Pagination
// ============================================

export async function getPaginatedBlogsExample(page: number, limit: number) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`/api/blogs?${params}`);
    const data = await response.json();

    if (data.success) {
      console.log('Posts:', data.data);
      console.log(`Page ${data.page} of ${data.totalPages}`);
      return {
        posts: data.data,
        currentPage: data.page,
        totalPages: data.totalPages,
        hasNextPage: data.page < data.totalPages,
      };
    }
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
  }
}

// ============================================
// EXAMPLE 4: Searching Blogs
// ============================================

export async function searchBlogsExample(query: string) {
  try {
    const response = await fetch(`/api/blogs/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.success) {
      console.log(`Search results for "${data.query}":`, data.results);
      console.log(`Found ${data.totalResults} results`);
      return data.results;
    } else {
      console.error('Search error:', data.error);
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// ============================================
// EXAMPLE 5: Fetching Single Blog
// ============================================

export async function getSingleBlogExample(slug: string) {
  try {
    const response = await fetch(`/api/blogs/${slug}`);
    const data = await response.json();

    if (data.success) {
      const blog = data.data;
      console.log('Blog title:', blog.title);
      console.log('Content sections:', blog.content.sections);
      console.log('Related posts:', data.related);
      console.log('Navigation:', data.navigation);
      return data;
    } else {
      console.error('Blog not found:', data.error);
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
  }
}

// ============================================
// EXAMPLE 6: Getting Categories
// ============================================

export async function getCategoriesExample() {
  try {
    const response = await fetch('/api/blogs/categories');
    const data = await response.json();

    if (data.success) {
      console.log('Hero section:', data.hero);
      console.log('Categories:', data.categories);
      data.categories.forEach((cat) => {
        console.log(`${cat.label}: ${cat.count} posts`);
      });
      return data.categories;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

// ============================================
// EXAMPLE 7: React Hook - useBlogs
// ============================================

import { useState, useEffect } from 'react';

interface BlogsState {
  posts: any[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
}

export function useBlogs(
  category?: string,
  page: number = 1,
  limit: number = 10
): BlogsState {
  const [state, setState] = useState<BlogsState>({
    posts: [],
    loading: true,
    error: null,
    total: 0,
    currentPage: page,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await fetch(`/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setState({
            posts: data.data,
            loading: false,
            error: null,
            total: data.total,
            currentPage: data.page,
            totalPages: data.totalPages,
          });
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: data.error || 'Failed to fetch blogs',
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        }));
      }
    };

    fetchBlogs();
  }, [category, page, limit]);

  return state;
}

// ============================================
// EXAMPLE 8: React Hook - useBlog (Single)
// ============================================

interface BlogState {
  blog: any | null;
  related: any[];
  navigation: any;
  loading: boolean;
  error: string | null;
}

export function useBlog(slug: string): BlogState {
  const [state, setState] = useState<BlogState>({
    blog: null,
    related: [],
    navigation: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState((prev) => ({
        ...prev,
        error: 'Slug is required',
        loading: false,
      }));
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();

        if (data.success) {
          setState({
            blog: data.data,
            related: data.related || [],
            navigation: data.navigation,
            loading: false,
            error: null,
          });
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: data.error || 'Blog not found',
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        }));
      }
    };

    fetchBlog();
  }, [slug]);

  return state;
}

// ============================================
// EXAMPLE 9: React Hook - useSearchBlogs
// ============================================

interface SearchState {
  results: any[];
  query: string;
  loading: boolean;
  error: string | null;
  totalResults: number;
}

export function useSearchBlogs(searchQuery: string, debounceMs: number = 500): SearchState {
  const [state, setState] = useState<SearchState>({
    results: [],
    query: '',
    loading: false,
    error: null,
    totalResults: 0,
  });

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setState({
        results: [],
        query: debouncedQuery,
        loading: false,
        error: null,
        totalResults: 0,
      });
      return;
    }

    const search = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await fetch(
          `/api/blogs/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();

        if (data.success) {
          setState({
            results: data.results || [],
            query: data.query,
            loading: false,
            error: null,
            totalResults: data.totalResults || 0,
          });
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: data.error || 'Search failed',
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Search failed',
        }));
      }
    };

    search();
  }, [debouncedQuery]);

  return state;
}

// ============================================
// EXAMPLE 10: React Component - BlogList
// ============================================

import React from 'react';

export function BlogListComponent() {
  const [category, setCategory] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const { posts, loading, error, totalPages } = useBlogs(category, page, 10);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list">
      <div className="controls">
        <select value={category} onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}>
          <option value="all">All Categories</option>
          <option value="ai">AI</option>
          <option value="automation">Automation</option>
          <option value="web-dev">Web Development</option>
          <option value="cloud">Cloud & DevOps</option>
          <option value="business">Business & Growth</option>
        </select>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <article key={post.id} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="meta">
              <span className="category">{post.categoryLabel}</span>
              <span className="read-time">{post.readTime}</span>
              <span className="author">{post.author.name}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 11: React Component - BlogDetail
// ============================================

export function BlogDetailComponent({ slug }: { slug: string }) {
  const { blog, related, navigation, loading, error } = useBlog(slug);

  if (loading) return <div>Loading blog...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <article className="blog-detail">
      <header className="blog-header">
        <h1>{blog.title}</h1>
        <div className="metadata">
          <span className="author">{blog.author.name}</span>
          <span className="date">{blog.date}</span>
          <span className="read-time">{blog.readTime}</span>
        </div>
      </header>

      <div className="blog-content">
        <p className="intro">{blog.content.intro}</p>

        {blog.content.sections.map((section, idx) => (
          <section key={idx}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <p className="conclusion">{blog.content.conclusion}</p>
      </div>

      <footer className="blog-footer">
        <div className="tags">
          {blog.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="related-posts">
            <h3>Related Posts</h3>
            {related.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`}>
                {post.title}
              </a>
            ))}
          </div>
        )}

        {navigation && (
          <div className="navigation">
            {navigation.previous && (
              <a href={`/blog/${navigation.previous.slug}`}>
                ← {navigation.previous.title}
              </a>
            )}
            {navigation.next && (
              <a href={`/blog/${navigation.next.slug}`}>
                {navigation.next.title} →
              </a>
            )}
          </div>
        )}
      </footer>
    </article>
  );
}

// ============================================
// EXAMPLE 12: React Component - BlogSearch
// ============================================

export function BlogSearchComponent() {
  const [query, setQuery] = React.useState('');
  const { results, loading, totalResults } = useSearchBlogs(query);

  return (
    <div className="blog-search">
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-results">
          <p>
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          </p>

          {loading && <div>Searching...</div>}

          {results.map((post) => (
            <div key={post.id} className="search-result">
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <small>{post.date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
