import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function BloggerInfo() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mb: 2
          }}
          alt="博主头像"
          src="/path-to-your-avatar.jpg"  // 替换为你的头像地址
        />
        
        <Typography variant="h6" component="h2" gutterBottom>
          博主昵称
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center">
          这里是博主的个人简介，可以写一些简短的介绍文字。
        </Typography>
        
        <Box sx={{ width: '100%', mt: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2">
              文章数：XX
            </Typography>
            <Typography variant="body2">
              分类数：XX
            </Typography>
            <Typography variant="body2">
              标签数：XX
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
} 