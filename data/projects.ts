import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tool-crib-management",
    title: "ToolCrib Management System",
    summary:
      "An AI-powered ToolCrib Management System that automates inventory management, procurement workflows, and intelligent decision-making for manufacturing environments.",
    overview:
      "ToolCrib is a web-based inventory management platform developed for PT Mattel Indonesia to digitize and optimize manufacturing tool and spare-part operations. The system streamlines inventory tracking, procurement workflows, and warehouse management while integrating AI-powered capabilities such as demand forecasting, semantic SKU deduplication, Smart PDF document extraction, and an interactive chatbot assistant. Built with a modern full-stack architecture, the platform enables multiple user roles to collaborate efficiently while improving inventory accuracy and operational productivity.",
    thumbnail: "/images/projects/toolcrib/thumbnail.png",
    problem:
      "Manufacturing companies often rely on manual inventory processes that make it difficult to maintain accurate stock levels and efficient procurement. Duplicate SKU records, static inventory thresholds, and manual document processing frequently lead to unnecessary purchases, stock shortages, increased operational costs, and production downtime. These challenges are further amplified by the absence of intelligent analytics that can assist warehouse personnel in making timely and data-driven inventory decisions.",
    solution:
      "ToolCrib addresses these operational challenges by integrating Predictive AI and Generative AI into a centralized inventory management platform. The system automates inventory optimization through demand forecasting, dynamic min-max stock recommendations, ABC/XYZ classification, and semantic SKU deduplication, while reducing administrative workload using an AI-powered Smart PDF Reader and an interactive chatbot for inventory assistance. By combining these AI capabilities with a role-based workflow, the platform enables faster, more accurate, and data-driven inventory management across warehouse and procurement operations.",
    role: "Full-Stack Developer",
    result:
      "Reduced tool loss incidents and improved inventory accuracy across production lines.",
    gallery: [
      "/images/projects/toolcrib/loginuser.png",
      "/images/projects/toolcrib/catalog.png",
    ],
    githubUrl: "https://github.com/nopall-png/Toolcrib2",
    websiteUrl: "https://github.com/nopall-png/Toolcrib2",
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "ChromaDB",
      "Ollama",
      "LangChain",
      "Pandas",
      "Matplotlib",
      "PDFPlumber",
    ],
  },
  {
    slug: "keshir-app",
    title: "Keshir Application",
    summary:
      "An AI-powered, modern Point of Sale (POS) and cashier system tailored for F&B businesses.",
    overview:
      "Keshir is a comprehensive, web-based POS solution designed to streamline restaurant and cafe operations. It bridges the gap between customers, front-of-house staff, and the kitchen. Customers can browse digital menus via QR code and interact with an AI Chatbot for recommendations. Cashiers get an intuitive dashboard for managing active bills and table statuses, while the kitchen staff receives real-time orders through a dedicated Kitchen Display System (KDS). Business owners have access to deep analytics, revenue tracking, and staff attendance management.",
    thumbnail: "/images/projects/keshir/thumbnail.png",
    problem:
      "F&B businesses often struggle with fragmented systems—taking orders manually, miscommunication with the kitchen, and lack of real-time sales insights. Existing comprehensive POS systems are often too expensive or overly complex for SMEs.",
    solution:
      "Developed a unified, role-based web application featuring a self-service QR Menu with AI assistance, a real-time Kitchen Display System (KDS) to eliminate paper tickets, a fast cashier POS, and an analytical dashboard for owners—all wrapped in a highly responsive, modern UI.",
    role: "AI Integrator & Frontend Developer",
    result:
      "Provided an accessible, efficient, and AI-enhanced POS ecosystem for F&B businesses.",
    gallery: [
      "/images/projects/keshir/login.png",
      "/images/projects/keshir/absensi.png",
      "/images/projects/keshir/menu.png",
      "/images/projects/keshir/chatbot.png",
      "/images/projects/keshir/dashboardkasir.png",
      "/images/projects/keshir/dashboardowner.png",
      "/images/projects/keshir/kitchen.png",
      "/images/projects/keshir/orderstories.png",
    ],
    githubUrl: "https://github.com/YogaSetyawan06/Keshir/tree/main",
    websiteUrl: "https://github.com/YogaSetyawan06/Keshir/tree/main",
    techStack: [
      "Laravel",
      "PHP",
      "Vanilla JS & CSS3",
      "MySQL",
      "Ollama",
      "Prompt Engineering",
    ],
  },
  {
    slug: "glowingkeun-ai",
    title: "Glowingkeun AI",
    summary:
      "AI-powered skincare recommendation system with personalized skin condition analysis.",
    thumbnail: "/images/projects/glowingkeunai/thumbnail.png",
    problem:
      "Many individuals struggle with identifying their specific skin types and acne conditions, leading to the use of inappropriate products that may worsen skin health. Key challenges include: inability to accurately distinguish between various types of acne (blackheads, pustules, etc.), lack of clear understanding regarding skin type (oily, dry, combination), absence of personalized skincare routines based on scientific analysis, and difficulty in tracking long-term skin health progress.",
    solution:
      "GLOWINGKEUN AI addresses these challenges by providing a comprehensive digital ecosystem that simplifies skin monitoring through advanced AI. \n 1. Intelligent Analysis: Detect 6 specific acne classes and classify skin types using state of the art AI models.\n 2. Personalized Routines: Receive dynamic Morning and Night routines tailored to your specific analysis results.\n 3. Face ID Security: Hardware-backed biometric authentication using Face recognition for secure login.\n 4. Progress Tracking: Save and monitor your analysis history to visualize your skin health journey.",
    role: "AI and Web Developer",
    result:
      "Delivered personalized skincare recommendations with improved user satisfaction.",
    gallery: [
      "/images/projects/glowingkeunai/header.png",
      "/images/projects/glowingkeunai/skinscan.png",
      "/images/projects/glowingkeunai/journey.png",
      "/images/projects/glowingkeunai/techai.png",
    ],
    githubUrl: "https://github.com/YogaSetyawan06",
    websiteUrl: "https://github.com/YogaSetyawan06",
    techStack: [
      "Python",
      "TensorFlow",
      "Scikit-Learn",
      "Flask",
      "Computer Vision",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    slug: "freshscan-ai",
    title: "FreshScan AI",
    summary: "Automated Fruit & Vegetable Freshness Classification",
    overview:
      "FreshScan AI is an AI-powered system designed to automatically classify whether a fruit or vegetable is fresh or stale using deep learning and computer vision. The system addresses the limitations of manual food inspection, which is time-consuming, subjective, and error-prone. The best model, EfficientNet-B0, achieved 99.91% test accuracy.",
    thumbnail: "/images/projects/freshscanai/thumbnail.png",
    problem:
      "Manual food inspection is time-consuming, subjective, and prone to errors. Furthermore, most existing solutions are implemented as mobile applications, which require users to download and install the application first. This can be a barrier for users who only need to perform occasional food quality checks.",
    solution:
      "To overcome these limitations, FreshScan AI was developed as a web-based application that offers easy accessibility and does not require installation. The system features a highly accurate AI model, real-time prediction capabilities, and a responsive user interface. FreshScan AI empowers users to quickly and reliably determine the freshness of fruits and vegetables, ensuring better food quality and safety.",
    role: "AI and Web Developer",
    result:
      "Delivered an accessible and reliable web-based food freshness detection system with high accuracy and real-time prediction capabilities.",
    gallery: [
      "/images/projects/freshscanai/home.png",
      "/images/projects/freshscanai/analyze.png",
    ],
    githubUrl: "https://github.com/YogaSetyawan06",
    websiteUrl: "https://github.com/YogaSetyawan06",
    techStack: [
      "Python",
      "Computer Vision",
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "NumPy",
      "Matplotlib",
      "Pandas",
      "Scikit-Learn",
    ],
  },
  {
    slug: "fintrack",
    title: "FinTrack",
    summary: "Personal Finance Tracker & Management Apps",
    thumbnail: "/images/projects/fintrack/thumbnail.png",
    overview:
      "Fintrack is a sophisticated personal finance management platform developed using Flutter, designed to help users track, manage, and analyze their financial activities in real-time. This project represents a modern solution to personal budgeting challenges by leveraging secure cloud infrastructure and comprehensive data visualization.",
    problem:
      "Many individuals struggle with personal financial management due to a lack of disciplined record-keeping and a clear understanding of spending patterns. Key challenges include the difficulty of tracking daily expenses across multiple accounts or wallets, the absence of intuitive data visualization for budget evaluation, and concerns regarding the security of sensitive financial data. Without the right tools, financial management often becomes a confusing administrative burden, leading to undetected waste and difficulty in achieving long-term financial goals.",
    solution:
      "Fintrack addresses these multifaceted challenges by providing a comprehensive digital ecosystem that simplifies transaction recording. The platform creates a centralized environment where users can monitor balances across various funding sources, categorize every expense, and gain instant insights through visual reports. By implementing real-time synchronization and biometric security, Fintrack ensures that financial data is not only easily accessible but also strictly private, giving users full control over their financial health.",
    role: "Mobile Application Developer",
    result:
      "This project demonstrates a comprehensive understanding of modern mobile application development, secure cloud integration, and the implementation of critical security features within the financial technology domain.",
    gallery: [
      "/images/projects/fintrack/page1.png",
      "/images/projects/fintrack/page2.png",
      "/images/projects/fintrack/page3.png",
      "/images/projects/fintrack/page4.png",
    ],
    githubUrl: "https://github.com/arizalanru/FinTrack/tree/main",
    websiteUrl: "https://github.com/arizalanru/FinTrack/tree/main",
    techStack: ["Flutter", "Firebase", "Dart", "Firestore"],
  },
  {
    slug: "scio",
    title: "Scio",
    summary: "AI-Powered IT Helpdesk",
    thumbnail: "/images/projects/scio/thumbnail.png",
    overview:
      "Scio is a web-based AI helpdesk system developed to automate technical support by combining Retrieval-Augmented Generation (RAG) with a hybrid inference architecture. The application retrieves relevant information from a knowledge base of over 10,000 IT documentation articles before generating responses, allowing users to receive reliable troubleshooting guidance with transparent source citations. It supports both local inference through Ollama for privacy-sensitive environments and cloud inference using Gemini for more complex reasoning tasks.",
    problem:
      "Many organizations struggle with repetitive IT support requests that increase response times and place a significant workload on helpdesk teams. While Large Language Models can automate these interactions, they often produce hallucinated or inaccurate technical information, making them unreliable for troubleshooting. In addition, organizations require solutions that protect sensitive internal documentation while still providing fast and trustworthy assistance.",
    solution:
      "Scio addresses these challenges by implementing a Hybrid Retrieval-Augmented Generation (RAG) architecture that grounds every response using verified IT documentation retrieved from a semantic vector database. The system combines local language models through Ollama with cloud-based Gemini inference, allowing users to balance privacy and performance based on their needs. To improve transparency and user trust, every generated answer includes real-time source citations, while context guarding prevents the chatbot from responding to questions outside the IT domain.",
    role: "Chatbot Application",
    result:
      "Successfully developed a production-ready AI chatbot capable of understanding and resolving complex IT support queries, integrated with both local and cloud-based AI models to ensure reliable performance and data privacy.",
    gallery: [
      "/images/projects/scio/page1.png",
      "/images/projects/scio/page2.png",
      "/images/projects/scio/page3.png",
      "/images/projects/scio/page4.png",
    ],
    githubUrl: "https://github.com/HuangMingZhi0206/Scio",
    websiteUrl: "https://github.com/HuangMingZhi0206/Scio",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "LangChain",
      "Llama3.2 3B",
      "Ollama",
      "Gemini 2.5 Flash",
      "ChromaDB",
      "all-MiniLM-L6-v2",
    ],
  },
];
