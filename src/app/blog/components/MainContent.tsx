import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import { Great_Vibes, Noto_Sans_SC } from "next/font/google";
import { useRouter } from 'next/navigation';
import { topPosts, type Post } from '../top/posts';
const greatVibes = Great_Vibes({
  weight: ["400"], // Great Vibes 只有 400 weight
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  // backgroundColor: (theme.vars || theme).palette.background.paper,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

const TypewriterText = styled(Typography)`
  @keyframes typing {
    from { max-width: 0 }
    to { max-width: 100% }
  }
  
  @keyframes blink {
    50% { border-color: transparent }
  }

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid;
  max-width: fit-content;
  width: fit-content;
  animation: 
    typing 8.5s steps(110, end) forwards,
    blink .75s step-end infinite;
`;

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ fontWeight: "normal" }}
          className={greatVibes.className}
        >
          Jianwen's Blog
        </Typography>
        <TypewriterText
          variant="h1"
          gutterBottom
          sx={{ 
            fontWeight: "normal",
            fontSize: '1.2rem',
            letterSpacing: '0.05em'
          }}
          className={notoSansSC.className}
        >永远保持好奇心</TypewriterText>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleClick} size="medium" label="置顶" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Company"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Product"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Design"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={12}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            onClick={() => router.push('/blog/post-1')}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              height: { md: '400px' }
            }}
          >
            <CardMedia
              component="img"
              alt="featured post"
              image={topPosts[0].img}
              sx={{
                width: { xs: '100%', md: '50%' },
                height: { xs: 'auto', md: '100%' },
                objectFit: 'cover'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <SyledCardContent sx={{ flex: 1 }}>
                <Chip label={topPosts[0].tag} size="small" sx={{ mb: 2 }} />
                <Typography variant="h4" gutterBottom component="div">
                  {topPosts[0].title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {topPosts[0].description}
                </Typography>
              </SyledCardContent>
              <Author authors={topPosts[0].authors} />
            </Box>
          </SyledCard>
        </Grid>
        {topPosts.slice(1).map((post, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index + 1}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(index + 1)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === index + 1 ? "Mui-focused" : ""}
            >
              <CardMedia
                component="img"
                alt={post.title}
                image={post.img}
                sx={{
                  height: 200,
                  objectFit: 'cover'
                }}
              />
              <SyledCardContent>
                <Chip label={post.tag} size="small" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom component="div">
                  {post.title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {post.description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={post.authors} />
            </SyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
