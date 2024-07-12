import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "hello@liam.dev";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("strongpassword", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "More Secure Authentication: From Passwords to Passkeys",
      content: `Authentication is a critical element of digital security, but traditional methods like passwords and social logins are increasingly inadequate. Passkeys offer a more secure alternative by using public-private key cryptography and biometric verification. This guide covers the current state of authentication, the mechanics and benefits of passkeys, and the challenges in integrating this technology. Understanding and adopting passkeys could signify a major leap forward in securing digital identities.`,
      authorId: user.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Data Structures Cheat Sheet",
      content: "This guide provides an introduction to data structures and their representation in Memgraph. It explains the basics of graphs, linked lists, queues, stacks, and trees, along with examples and queries to create these data structures using Memgraph. The document also discusses tree traversal algorithms like BFS and DFS and demonstrates how to run these algorithms in Memgraph.",
      authorId: user.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Five9 and Deepgram Partner to Revolutionize Contact Center AI",
      content: "Deepgram and Five9 have partnered to integrate Deepgram's Nova-2 automatic speech recognition (ASR) into Five9 IVA Studio 7, significantly enhancing the accuracy of speech-to-text transcription for various alphanumeric inputs. This integration aims to improve customer self-service channels, reducing the need for live agent involvement and leading to substantial cost savings. The enhancements are particularly beneficial for real-time and post-recording transcriptions, offering higher accuracy, low latency, cost efficiency, and better user experiences.",
      authorId: user.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "I Can’t Believe TypeScript Finally Fixed This",
      content: "TypeScript 5.5 has resolved a significant issue with type filtering in arrays. In previous versions, removing `null` from an array of numbers would still leave the type as `number | null`, causing potential errors. The latest update ensures the array type is accurately recognized as just `number` once `null` values are filtered out. This enhancement removes the need for custom libraries to handle such filtering.",
      authorId: user.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "GitHub Repositories Every Software Engineer Should Know",
      content: "The post provides a curated list of GitHub repositories valuable for software engineers at any stage of their career. Categories include RoadMaps, Books, Blogs, and Websites, Algorithms, Design Patterns, System Design, Design Resources, Projects, Tutorials, and APIs. Each category offers specific repositories that serve as educational materials and practical resources to improve various aspects of software development skills.",
      authorId: user.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "How to Know You’ve Become a Senior Programmer",
      content: "Senior programmers face increasing complexity and responsibility as they strive to ensure code maintainability and quality. Over time, they shift from making rapid changes to carefully evaluating the impacts of their actions, often incorporating extensive testing and documentation. This evolution from impulsive coding to cautious development reflects a deeper understanding of the potential repercussions changes can have on a system, highlighting the importance of risk assessment and thorough planning in software development.",
      authorId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
