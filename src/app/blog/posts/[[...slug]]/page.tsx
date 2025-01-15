import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import { Typography, Container, Box, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import 'public/styles/font.css'

// Helper to get all MD files recursively
function getMDFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMDFiles(fullPath);
    }
    return entry.name.endsWith('.md') ? fullPath : [];
  });
  return files;
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/content/md");
  const files = getMDFiles(postsDirectory);

  return files.map(file => ({
    slug: path.relative(postsDirectory, file)
      .replace(/\.md$/, '')
      .split(path.sep)
  }));
}

async function getPost(slugArray: string[]) {
  const postsDirectory = path.join(process.cwd(), "src/content/md");
  const fullPath = path.join(postsDirectory, ...slugArray) + '.md';

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatter, content };
  } catch (error) {
    throw new Error(`Failed to load post at ${fullPath}`);
  }
}

export default async function BlogPost({
  params
}: {
  params: { slug?: string[] }
}) {
  // Handle both root /blog and nested paths
  const slugArray = params.slug || [];
  const { frontmatter, content } = await getPost(slugArray);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/blog"
        sx={{
          mb: 4,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)'
          }
        }}
        variant="text"
        startIcon={<ArrowBackIcon />}
      >
        Back to Home
      </Button>

      <article>
        {/* Header section */}
        <Box component="header" sx={{ mb: 6 }}>
          {frontmatter.title && (
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3
              }}
            >
              {frontmatter.title}
            </Typography>
          )}

          {/* Meta information */}
          <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
            {frontmatter.date && (
              <Typography variant="body2">
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            )}
            {frontmatter.author && (
              <Typography variant="body2">
                By {frontmatter.author}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Content section */}
        <Box
          sx={{
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            },
          }}
        >
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: Typography,
                  props: {
                    variant: "h1",
                    component: "h1",
                    sx: {
                      mt: 6,
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      fontFamily: '"EB Garamond", serif',
                      fontWeight: 700,
                      color: '#2f3542',
                      letterSpacing: '-0.01em'
                    }
                  },
                },
                h2: {
                  component: Typography,
                  props: {
                    variant: "h2",
                    component: "h2",
                    sx: {
                      mt: 6,
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontFamily: '"EB Garamond","Source Han Serif SC", serif',
                      fontWeight: 700,
                      color: '#2f3542',
                      letterSpacing: '-0.01em'
                    }
                  },
                },
                h3: {
                  component: Typography,
                  props: {
                    variant: "h3",
                    component: "h3",
                    sx: {
                      mt: 5,
                      mb: 2,
                      fontSize: { xs: '1.75rem', md: '2rem' },
                      fontFamily: '"EB Garamond","Source Han Serif SC", serif',
                      fontWeight: 600,
                      color: '#2f3542',
                      letterSpacing: '-0.01em'
                    }
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    variant: "body1",
                    sx: {
                      mb: 2.5,
                      lineHeight: 2,
                      fontFamily: '"EB Garamond","Source Han Serif SC", serif',
                      fontSize: { 
                        xs: '1.125rem',  // 18px
                        sm: '1.25rem',   // 20px
                        md: '1.375rem'   // 22px
                      },
                      color: '#2f3542',
                      letterSpacing: '0.01em'
                    }
                  },
                },
                a: {
                  component: Link,
                  props: {
                    color: "primary"
                  }
                }
              }
            }}
          >
            {content}
          </Markdown>
        </Box>
      </article>
    </Container>
  );
}