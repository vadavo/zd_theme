import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import ChevronUp from "@zendeskgarden/svg-icons/src/16/chevron-up-fill.svg";
import ChevronDown from "@zendeskgarden/svg-icons/src/16/chevron-down-fill.svg";
import { useTranslation } from "react-i18next";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { XXXL } from "@zendeskgarden/react-typography";

const DescriptionWrapper = styled.div`
  border-bottom: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  padding-bottom: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const ItemTitle = styled(XXXL)`
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`;

const CollapsibleText = styled.div<{ expanded: boolean }>`
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.expanded ? "none" : 3)};
  overflow: hidden;
  margin-top: ${(props) => props.theme.space.md};
  padding-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
`;

const ToggleButton = styled(Button)`
  margin-top: ${(props) => props.theme.space.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  &:hover {
    text-decoration: none;
  }
`;

interface CollapsibleDescriptionProps {
  title: string;
  description: string;
}

export const CollapsibleDescription = ({
  title,
  description,
}: CollapsibleDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showToggleButton, setShowToggleButton] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxHeight = lineHeight * 3;
      if (descriptionRef.current.scrollHeight > maxHeight) {
        setShowToggleButton(true);
      } else {
        setShowToggleButton(false);
      }
    }
  }, [description]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <DescriptionWrapper>
      <ItemTitle tag="h1">{title}</ItemTitle>
      <CollapsibleText expanded={isExpanded} ref={descriptionRef}>
        {description}
      </CollapsibleText>
      {showToggleButton && (
        <ToggleButton isLink onClick={toggleDescription}>
          {isExpanded
            ? t("service-catalog.item.read-less", "Read less")
            : t("service-catalog.item.read-more", "Read more")}
          <Button.EndIcon>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button.EndIcon>
        </ToggleButton>
      )}
    </DescriptionWrapper>
  );
};
