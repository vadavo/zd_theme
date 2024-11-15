import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import { useEffect, useState } from "react";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import { useItemFormFields } from "./components/useItemFormFields";
import { ItemRequestForm } from "./components/service-catalog-item/ItemRequestForm";
import type { Organization } from "../ticket-fields";
import { CollapsibleDescription } from "./components/service-catalog-item/CollapsibleDescription";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const FromFieldsWrapper = styled.div`
  margin-right: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    bottom: 0;
    margin-left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  padding: ${(props) => props.theme.space.lg};
  border: ${(props) => props.theme.borders.sm}
    ${(props) => getColorV8("grey", 300, props.theme)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    background: ${(props) => props.theme.colors.background};
    padding: ${(props) => props.theme.space.lg};
    border: none;
    border-top: ${(props) => props.theme.borders.sm}
      ${(props) => getColorV8("grey", 300, props.theme)};
    width: 100vw;
    left: 0;
    right: 0;
  }
`;

export interface ServiceCatalogItemPageProps {
  serviceCatalogItemId: number;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  organizations: Array<Organization>;
  wysiwyg: boolean;
}

export function ServiceCatalogItemPage({
  serviceCatalogItemId,
  baseLocale,
  hasAtMentions,
  userRole,
  organizations,
  userId,
  brandId,
}: ServiceCatalogItemPageProps) {
  const [serviceCatalogItem, setServiceCatalogItem] =
    useState<ServiceCatalogItem>({} as ServiceCatalogItem);
  const { requestFields, handleChange } = useItemFormFields(
    serviceCatalogItem,
    baseLocale
  );
  const { t } = useTranslation();
  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;

  useEffect(() => {
    async function fetchServiceCatalogItem() {
      try {
        const response = await fetch(
          `/api/v2/help_center/service_catalog/items/${serviceCatalogItemId}`
        );
        const data = await response.json();
        if (response.ok) {
          setServiceCatalogItem(data.service_catalog_item);
        }
      } catch (error) {
        console.error("Error fetching service catalog item:", error);
      }
    }
    fetchServiceCatalogItem();
  }, [serviceCatalogItemId]);

  return (
    <Container>
      <LeftColumn>
        <CollapsibleDescription
          title={serviceCatalogItem.name}
          description={serviceCatalogItem.description}
        />
        <FromFieldsWrapper>
          <ItemRequestForm
            requestFields={requestFields}
            baseLocale={baseLocale}
            hasAtMentions={hasAtMentions}
            userRole={userRole}
            userId={userId}
            brandId={brandId}
            defaultOrganizationId={defaultOrganizationId}
            handleChange={handleChange}
          />
        </FromFieldsWrapper>
      </LeftColumn>
      <RightColumn>
        <ButtonWrapper>
          <Button isPrimary size="large" isStretched>
            {t("service-catalog.item.submit-button", "Submit request")}
          </Button>
        </ButtonWrapper>
      </RightColumn>
    </Container>
  );
}
