import { gql } from "graphql-tag";

export const LIST_UPDATED = gql`
	subscription Subscription {
		updateAllList
	}
`;
