export interface MdxComponentProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

export interface MdxLinkProps extends MdxComponentProps {
  href?: string;
}

export interface MdxImgProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}
