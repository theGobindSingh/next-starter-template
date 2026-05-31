import type { GetStaticProps } from "next";

interface ClientLogo {
  name: string;
  src: string;
}

interface ClientsPageProps {
  clients: Record<string, ClientLogo[]>;
}

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
]);

const IMAGE_DIR = ["public", "assets", "images", "clients"] as const;
const IMAGE_URL_BASE = "/assets/images/clients";

const toDisplayName = (fileName: string, path: typeof import("path")) => {
  return path.basename(fileName, path.extname(fileName));
};

export const readClientsFromAssets = async (): Promise<
  ClientsPageProps["clients"]
> => {
  const fs = (await import("fs")).default;
  const path = (await import("path")).default;

  const rootDir = path.join(process.cwd(), ...IMAGE_DIR);
  const categories = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => {
      return entry.isDirectory();
    })
    .map((entry) => {
      return entry.name;
    });

  const clients: ClientsPageProps["clients"] = {};

  for (const category of categories) {
    const categoryDir = path.join(rootDir, category);
    const files = fs.readdirSync(categoryDir).filter((fileName) => {
      return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
    });

    clients[category] = files.map((fileName) => {
      return {
        name: toDisplayName(fileName, path),
        src: `${IMAGE_URL_BASE}/${category}/${fileName}`,
      };
    });
  }

  return clients;
};

// eslint-disable-next-line react-refresh/only-export-components -- gsp
export const getStaticProps: GetStaticProps<ClientsPageProps> = async () => {
  const clients = await readClientsFromAssets();
  return { props: { clients } };
};
