export type Solution = {
  title: string;
  description: string;
  detail: {
    slug: string;
    title: string;
    description: string;
    heroImage: string;
    intro: {
      title: string;
      description: string;
    };
    features: {
      title: string;
      description: string;
    }[];
    benefits: string[];
    partnership: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      image: string;
    };
    pathways: {
      title: string;
      description: string;
      link: string;
    }[];
  };
};
