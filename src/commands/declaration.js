/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */
export const PUTOALLAN_COMMAND = {
  name: "puto",
  description: "Prints a beautiful #PutoAllan",
  options: [
    {
      name: "not-allan",
      description: "Specifies the name following the `PUTO`",
      type: 3,
    },
  ],
};
