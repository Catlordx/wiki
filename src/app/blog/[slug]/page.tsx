import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import { Typography, Container, Box } from '@mui/material';

// 获取所有博客文件用于静态生成
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/md'));
  
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

// 获取单篇博客内容
async function getPost(slug: string) {
  const markdownFile = fs.readFileSync(
    path.join(process.cwd(), 'src/content/md', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownFile);
  return {
    frontmatter,
    content,
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { frontmatter, content } = await getPost(params.slug);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {frontmatter.title && (
          <Typography variant="h2" component="h1" gutterBottom>
            {frontmatter.title}
          </Typography>
        )}
        {frontmatter.date && frontmatter.author && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {frontmatter.author} on {frontmatter.date}
          </Typography>
        )}
        <Box sx={{ mt: 4 }}>
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: Typography,
                  props: {
                    variant: 'h3',
                    component: 'h1',
                    gutterBottom: true,
                  },
                },
                h2: {
                  component: Typography,
                  props: {
                    variant: 'h4',
                    component: 'h2',
                    gutterBottom: true,
                  },
                },
                h3: {
                  component: Typography,
                  props: {
                    variant: 'h5',
                    component: 'h3',
                    gutterBottom: true,
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    variant: 'body1',
                    gutterBottom: true,
                  },
                },
                img: {
                  props: {
                    style: {
                      maxWidth: '100%',
                      height: 'auto',
                    },
                  },
                },
                code: {
                  component: 'code',
                  props: {
                    style: {
                      backgroundColor: '#f5f5f5',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                    },
                  },
                },
              },
            }}
          >
            {content}
          </Markdown>
        </Box>
      </Box>
    </Container>
  );
}