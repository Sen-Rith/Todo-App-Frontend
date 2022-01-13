import { gql } from "graphql-tag";

export const ALL_LIST = gql`
	query Query {
		lists {
			id
			title
			tasks {
				id
				title
				description
				completed
			}
		}
	}
`;
