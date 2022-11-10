import classNames from 'classnames';

type ImageProps = {
  src: string;
  alt: string;
  width?: 'full' | 'auto' | number;
  height?: 'full' | 'auto' | string;
  objectFit?: 'cover' | 'contain';
  className?: string;
};

export const Image = ({
  src,
  alt,
  width = 'full',
  height = 'auto',
  objectFit = 'cover',
  className,
  ...props
}: ImageProps) => {
  const classes = classNames(
    'object-cover',
    {
      'w-full': width === 'full',
      'w-auto': width === 'auto',
      [`${width}`]: typeof width === 'string',
      'h-full': height === 'full',
      [`${height}`]: typeof height === 'string',
      [`object-${objectFit}`]: objectFit !== undefined,
    },
    className,
  );

  return <img src={src} alt={alt} className={classes} {...props} />;
};
