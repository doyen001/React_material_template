import { Fragment, useState, useEffect } from "react";

// next.js components
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

// next-mdx-remote components
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

// mdx-observable components
import { State, Observe } from "mdx-observable";

// markdown utils
import fs from "fs";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

// page components
import DocsFooter from "components/layout/docs-footer";
import DocsNavbar from "components/layout/docs-navbar";
import Sidenav from "components/layout/sidenav";
import PageMap from "components/layout/page-map";
import ComponentDemo from "components/cards/component-demo";
import Code from "components/code";
import Pre from "components/pre";
import CodeSandbox from "components/code-sandbox";
import StackBlitz from "components/stack-blitz";
import Framework from "components/cards/framework";
import CraLogo from "components/icons/cra";
import NextLogo from "components/icons/next";
import RemixLogo from "components/icons/remix";
import ViteLogo from "components/icons/vite";
import ColorPalette from "components/color-palette";
import DocsRelated from "components/layout/docs-related";

// @material-tailwind/react components
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MobileNav,
  Navbar,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Progress,
  Radio,
  Select,
  Switch,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

// routes
import { routes as htmlRoutes } from "routes/html.routes";
import { routes as reactRoutes } from "routes/react.routes";

// utils
import config from "utils/rehype-pretty-code-config";
import filterArray from "utils/filter-array";
import getDirectoriesAndFile from "utils/get-directories-and-files";

const components = {
  h1: (props) => (
    <Typography
      as="h1"
      variant="h3"
      color="blue-gray"
      className="!mb-4 lg:!text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <Typography
      as="h2"
      variant="h4"
      color="blue-gray"
      className="!mb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <Typography
      as="h3"
      variant="h5"
      color="blue-gray"
      className="!mb-2"
      {...props}
    />
  ),
  h6: (props) => (
    <Typography
      as="p"
      variant="h5"
      className="!mb-12 !font-normal !text-blue-gray-500"
      {...props}
    />
  ),
  p: (props) => (
    <Typography className="!mb-4 !font-normal !text-blue-gray-500" {...props} />
  ),
  hr: () => <hr className="!mt-24 !mb-20 !border-blue-gray-50" />,
  a: (props) => (
    <a
      className="!font-medium !text-blue-gray-900 !transition-colors hover:!text-blue-500"
      {...props}
    />
  ),
  table: (props) => (
    <div className="!overflow-scroll">
      <table className="!w-full !min-w-[700px] lg:!min-w-full" {...props} />
    </div>
  ),
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr {...props} />,
  th: (props) => (
    <th
      className="min-w-[120px] border-b border-blue-gray-100 py-3 text-left font-medium text-blue-gray-900"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="min-w-[120px] border-b border-blue-gray-50 py-3 text-left text-sm text-blue-gray-500"
      {...props}
    />
  ),
  pre: (props) => <Pre {...props} />,
  State,
  Observe,
  Image,
  ComponentDemo,
  CodeSandbox,
  StackBlitz,
  Code,
  Framework,
  CraLogo,
  NextLogo,
  RemixLogo,
  ViteLogo,
  ColorPalette,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MobileNav,
  Navbar,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Progress,
  Radio,
  Select,
  Switch,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Textarea,
  Tooltip,
  Typography,
};

// @material-tailwind/html components scripts
import init from "public/material-tailwind-html";
import ripple from "public/material-ripple-effects";

export default function Page({ frontMatter, mdxSource, slug }) {
  const { asPath } = useRouter();
  const [mobileNav, setMobileNav] = useState(false);

  const routes = {
    html: htmlRoutes,
    react: reactRoutes,
  };
  const validFrameworks = ["html", "react", "vue", "angular", "svelte"];
  const frameworkType = asPath
    .split("/")
    .filter((el) => validFrameworks.includes(el))
    .join("") as "html" | "react" | "vue" | "angular" | "svelte";

  useEffect(() => {
    if (frameworkType === "html") {
      init();
      ripple();
    }
  }, [frameworkType, slug]);

  return (
    <Fragment>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
      </Head>
      <div className="relative h-full w-full bg-white">
        <DocsNavbar slug={slug[slug.length - 1]} setMobileNav={setMobileNav} />
        <div className="px-6">
          <div className="mx-auto flex max-w-[1440px]">
            <Sidenav
              routes={routes[frameworkType]}
              type={frameworkType}
              slug={slug[slug.length - 1]}
              mobileNav={mobileNav}
              setMobileNav={setMobileNav}
            />
            <div className="mt-36 w-full lg:mt-24 lg:w-[60%] lg:px-6">
              <MDXRemote {...mdxSource} components={components} />
              {frontMatter.related && (
                <DocsRelated routes={frontMatter.related} />
              )}
              <DocsFooter type={frameworkType} frontMatter={frontMatter} />
            </div>
            <PageMap frontMatter={frontMatter} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const baseDirectory = "documentation";
  const paths = [];
  const allDir = getDirectoriesAndFile(baseDirectory);
  const filteredArray = filterArray(allDir);

  for (let i = 0; i < filteredArray.length - 1; i++) {
    const directories = filteredArray[i]
      .split("/")
      .filter((dir) => dir !== baseDirectory);
    const files = filteredArray[i + 1].includes("/")
      ? filteredArray[i + 1].split("/").filter((dir) => dir !== baseDirectory)
      : filteredArray[i + 1];

    const filename = Array.isArray(files) ? null : files;

    filename &&
      paths.push({
        params: {
          slug: [...directories, filename],
        },
      });
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    `documentation/${slug.join("/")}.mdx`
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, config]],
      remarkPlugins: [remarkGfm],
      development: false,
    },
  });

  return {
    props: {
      frontMatter,
      mdxSource,
      slug,
    },
  };
};
