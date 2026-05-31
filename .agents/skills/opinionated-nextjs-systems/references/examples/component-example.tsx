// Replace imports with your host project's path conventions.
import Button from "../components/button";
import type { ButtonVariant } from "../components/button/types";
import { H3, P } from "../components/html";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import StandardSectionLayout from "../layouts/standard-section";
import type { ComponentType } from "react";
import { useCallback } from "react";

interface ServicesSectionProps {
  chip?: string;
  title?: string;
  description?: string;
  items?: {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  ctas?: {
    text: string;
    href: string;
    variant?: ButtonVariant;
  }[];
  onCtaClick?: ((ctaText: string) => void) | undefined;
}

type ServiceItem = NonNullable<ServicesSectionProps["items"]>[number];
type ServiceCta = NonNullable<ServicesSectionProps["ctas"]>[number];

const serviceCardHoverStyles = css`
  border-color: rgba(var(--color-secondary-600-base), 0.5);

  .icon {
    color: var(--color-secondary-700);
  }
`;

const ServicesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    & > article {
      min-width: 75vw;
      scroll-snap-align: center;
    }
  }
`;

const ServiceCard = styled("article")<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(var(--color-neutral-800-base), 0.35);
  transition: border-color 0.3s ease;

  ${({ $highlight = false }) => {
    return (
      $highlight &&
      css`
        border-color: rgba(var(--color-secondary-700-base), 0.65);
      `
    );
  }}

  .icon {
    font-size: var(--fs-l);
    color: var(--color-secondary-500);
    transition: color 0.3s ease;
  }

  &:hover,
  &.active {
    ${serviceCardHoverStyles}
  }
`;

const CtaRow = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const serviceCardMapper = ({
  icon: Icon,
  title,
  description,
  highlight,
}: ServiceItem) => {
  return (
    <ServiceCard key={title} $highlight={highlight}>
      <Icon className="icon" />
      <H3
        $size="1xs"
        $weight="700"
        $color="primary"
        $colorWeight="200"
        $margin="0"
      >
        {title}
      </H3>
      <P
        $size="3xs"
        $weight="500"
        $color="neutral"
        $colorWeight="500"
        $lineHeight="1.6"
        $margin="0"
      >
        {description}
      </P>
    </ServiceCard>
  );
};

const ServicesSection = ({
  chip,
  title,
  description,
  items = [],
  ctas = [],
  onCtaClick,
}: ServicesSectionProps) => {
  const ctaMapper = useCallback(
    ({ text, href, variant = "filled" }: ServiceCta, index: number) => {
      return (
        <Button
          key={`${text}-${index}`}
          href={href}
          $variant={variant}
          $size="md"
          $borderRadius="md"
          onClick={() => {
            onCtaClick?.(text);
          }}
        >
          {text}
        </Button>
      );
    },
    [onCtaClick],
  );

  return (
    <StandardSectionLayout
      chip={chip}
      title={title ?? ""}
      description={description}
      element="section"
    >
      {items.length > 0 && (
        <ServicesGrid>{items.map(serviceCardMapper)}</ServicesGrid>
      )}
      {ctas.length > 0 && <CtaRow>{ctas.map(ctaMapper)}</CtaRow>}
    </StandardSectionLayout>
  );
};

export default ServicesSection;
