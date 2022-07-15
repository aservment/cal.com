import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

import classNames from "@lib/classNames";
import { defaultAvatarSrc } from "@lib/profile";

import { Maybe } from "@trpc/server";

export type AvatarProps = {
  className?: string;
  size?: number;
  imageSrc?: Maybe<string>;
  title?: string;
  alt: string;
  gravatarFallbackMd5?: string;
};

/**
 * @deprecated Use AvatarSSR instead. Once, there is no usage of Avatar, AvatarSSR can be renamed.
 */
export default function Avatar(props: AvatarProps) {
  const { imageSrc, gravatarFallbackMd5, size, alt, title } = props;
  const className = classNames("rounded-full", props.className, size && `h-${size} w-${size}`);
  const avatar = (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Image
        src={imageSrc ?? undefined}
        alt={alt}
        className={classNames("rounded-full", `h-auto w-${size}`, props.className)}
      />
      <AvatarPrimitive.Fallback delayMs={600}>
        {gravatarFallbackMd5 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={defaultAvatarSrc({ md5: gravatarFallbackMd5 })} alt={alt} className={className} />
        )}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );

  return title ? (
    <Tooltip.Tooltip delayDuration={300}>
      <Tooltip.TooltipTrigger className="cursor-default">{avatar}</Tooltip.TooltipTrigger>
      <Tooltip.Content className="rounded-sm bg-black p-2 text-sm text-white shadow-sm">
        <Tooltip.Arrow />
        {title}
      </Tooltip.Content>
    </Tooltip.Tooltip>
  ) : (
    <>{avatar}</>
  );
}
