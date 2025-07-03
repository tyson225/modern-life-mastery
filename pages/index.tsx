import { useEffect, useState, type FC } from 'react';
import "../app/globals.css";

// Define TypeScript interfaces
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}

type Category = 'all' | 'productivity' | 'wellness' | 'lifestyle' | 'health' | 'finance';

// Define the page component
const HomePage: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data simulating Contentful CMS content
  const blogPosts: BlogPost[] = [
    {
      slug: 'mindfulness-at-work',
      title: 'The Power of Mindfulness at Work',
      excerpt: 'Discover how mindfulness practices can boost productivity and reduce stress in the modern workplace.',
      category: 'productivity',
      date: '2024-11-05',
      image: 'https://picsum.photos/id/10/800/600 ',
      author: 'Sarah Chen',
      readTime: '5 min read'
    },
    {
      slug: 'digital-detox',
      title: 'Digital Detox: Reclaiming Your Time',
      excerpt: 'Learn practical strategies to disconnect from digital overload and regain focus on what matters most.',
      category: 'wellness',
      date: '2024-10-28',
      image: 'https://picsum.photos/id/20/800/600 ',
      author: 'James Wilson',
      readTime: '7 min read'
    },
    {
      slug: 'minimalist-living',
      title: 'Minimalist Living: Less is More',
      excerpt: 'Explore the benefits of minimalist living and how it can lead to greater clarity and happiness.',
      category: 'lifestyle',
      date: '2024-10-15',
      image: 'https://picsum.photos/id/30/800/600 ',
      author: 'Emily Rodriguez',
      readTime: '6 min read'
    },
    {
      slug: 'smart-goals',
      title: 'Setting Smart Goals for Success',
      excerpt: 'Master the art of goal-setting with our comprehensive guide to SMART goals.',
      category: 'productivity',
      date: '2024-10-08',
      image: 'https://picsum.photos/id/40/800/600 ',
      author: 'Michael Johnson',
      readTime: '8 min read'
    },
    {
      slug: 'sleep-hygiene',
      title: 'Optimizing Sleep Hygiene',
      excerpt: 'Unlock better sleep with science-backed strategies for improving your nighttime routine.',
      category: 'health',
      date: '2024-09-30',
      image: 'https://picsum.photos/id/50/800/600 ',
      author: 'Dr. Lisa Kim',
      readTime: '9 min read'
    },
    {
      slug: 'financial-freedom',
      title: 'Path to Financial Freedom',
      excerpt: 'Take control of your finances with these essential money management principles.',
      category: 'finance',
      date: '2024-09-20',
      image: 'https://picsum.photos/id/60/800/600 ',
      author: 'Robert Thompson',
      readTime: '10 min read'
    }
  ];

  const categories: Category[] = ['all', 'productivity', 'wellness', 'lifestyle', 'health', 'finance'];

  // Filter posts based on active category and search query
  const filteredPosts: BlogPost[] = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group posts by month for archive
  const postsByMonth: Record<string, BlogPost[]> = blogPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  // Extract unique months for archive menu
  const archiveMonths: string[] = Object.keys(postsByMonth).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  // Get current year for footer
  const currentYear: number = new Date().getFullYear();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside (simulated)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isMenuOpen && !target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Modern Life Mastery</h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
          </nav>

          {/* Search Button */}
          <button className="hidden md:flex items-center text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="menu-container md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors py-1">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors py-1">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors py-1">
                Blog
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors py-1">
                Contact
              </a>
              <div className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Modern Life Through Thoughtful Living
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Practical insights for personal growth, wellness, and intentional living in today&apos;s fast-paced world.
            </p>
            <a
              href="#blog-section"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Articles
            </a>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/10 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog-section" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
                <p className="text-gray-600">Thought-provoking insights for a more intentional life</p>

                {/* Category Filter */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg text-indigo-800">
                  Showing {filteredPosts.length} results for &quot;{searchQuery}&quot;
                </div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {filteredPosts.map(post => (
                  <article
                    key={post.slug}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span className="capitalize">{post.category}</span>
                        <span className="mx-2">•</span>
                        <time>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        <a href={`/posts/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By {post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Search Box */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Articles</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category}>
                        <button
                          onClick={() => setActiveCategory(category)}
                          className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeCategory === category
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span className="capitalize">{category}</span>
                          <span className="text-sm text-gray-500">
                            {category === 'all' ? blogPosts.length : blogPosts.filter(p => p.category === category).length}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                  <ul className="space-y-4">
                    {blogPosts.slice(0, 3).map(post => (
                      <li key={post.slug} className="flex">
                        <div className="mr-4 w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                            <a href={`/posts/${post.slug}`}>{post.title}</a>
                          </h4>
                          <div className="text-xs text-gray-500 mt-1">{new Date(post.date).toLocaleDateString()}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Archive */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Archive</h3>
                  <ul className="space-y-2">
                    {archiveMonths.map(month => (
                      <li key={month}>
                        <button className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                          <span>{month}</span>
                          <span className="text-sm text-gray-500">{postsByMonth[month].length}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Join thousands of readers who are mastering modern life through thoughtful living and continuous self-improvement.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Modern Life Mastery</h3>
              <p className="text-sm">
                A curated collection of insights and strategies for personal growth, wellness, and intentional living in the
                modern world.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.slice(1).map(category => (
                  <li key={category}>
                    <a href="#" className="hover:text-white transition-colors capitalize">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Subscribe</h3>
              <p className="text-sm mb-4">Get our latest articles delivered straight to your inbox.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {currentYear} Modern Life Mastery. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;