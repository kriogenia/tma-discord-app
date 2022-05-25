/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

//	/opvol {volume}
export const ONE_PIECE_COMMAND = {
  name: "opvol",
  description: "Creates a new One Piece volume thread",
  options: [
    {
      name: "number",
      description: "Specify the number of the volume",
      type: 3,
      required: true,
    },
  ],
};

//	/puto {name?}
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
