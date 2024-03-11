export function displayWeaknessStrength(pokemonType1, pokemonType2 = []) {
  let arr1 = [];
  let arr2 = [];

  arr1.push({
    weakness: pokemonType1.double_damage_from.map((el) => el.name),
    resistsTo: pokemonType1.half_damage_from.map((el) => el.name),
    immuneTo: pokemonType1.no_damage_from.map((el) => el.name),
  });

  arr2.push({
    weakness: pokemonType2.double_damage_from?.map((el) => el.name) || [],
    resistsTo: pokemonType2.half_damage_from?.map((el) => el.name) || [],
    immuneTo: pokemonType2.no_damage_from?.map((el) => el.name) || [],
  });

  const final = [
    {
      weakness: [...new Set([...arr1[0].weakness, ...arr2[0].weakness])],
      resistsTo: [...new Set([...arr1[0].resistsTo, ...arr2[0].resistsTo])],
      immuneTo: [...new Set([...arr1[0].immuneTo, ...arr2[0].immuneTo])],
    },
  ];

  const resistsTo = final[0].resistsTo
    .filter((el) => !final[0].weakness.includes(el))
    .filter((e) => !final[0].immuneTo.includes(e));
  const weakness = final[0].weakness
    .filter((el) => !final[0].resistsTo.includes(el))
    .filter((e) => !final[0].immuneTo.includes(e));

  const final2 = {
    resistance: resistsTo,
    weakness: weakness,
    immunity: final[0].immuneTo,
  };

  return final2;
  // const doubleDamageFrom = pokemonType1.double_damage_from.map(
  //   (double) => double.name
  // );
  // const halfDamageFrom = pokemonType1.half_damage_from.map((half) => half.name);

  // if (pokemonType2.length === 0) {
  //   const weak = doubleDamageFrom;
  //   const resists = halfDamageFrom;
  //   return { resists, weak };
  // }

  // const doubleDamageFrom2 = pokemonType2.double_damage_from.map(
  //   (double) => double.name
  // );
  // const halfDamageFrom2 = pokemonType2.half_damage_from.map(
  //   (half) => half.name
  // );

  // const resistsTo = halfDamageFrom2.filter(
  //   (double) => !doubleDamageFrom.includes(double)
  // );
  // const resistsTo2 = halfDamageFrom.filter(
  //   (double) => !doubleDamageFrom2.includes(double)
  // );
  // const resists = [...new Set([...resistsTo, ...resistsTo2])];

  // const weakAgainst = doubleDamageFrom.filter(
  //   (double) => !halfDamageFrom2.includes(double)
  // );
  // const weakAgainst2 = doubleDamageFrom2.filter(
  //   (double) => !halfDamageFrom.includes(double)
  // );
  // const weak = [...new Set([...weakAgainst, ...weakAgainst2])];

  // return { resists, weak };
}

export function displayPokemonDescription(descriptionMap) {
  const groupByCategory = descriptionMap.flavor_text_entries.map((entry) => {
    if (entry.language.name === "en") {
      return {
        game: entry.version.name,
        combined: {
          [entry.version.name]: entry.flavor_text,
        },
        description: entry.flavor_text,
      };
    }
    return {};
  });

  const newArray = groupByCategory.filter(
    (value) => Object.keys(value).length !== 0
  );
  return newArray;
}

export function adjustText(text) {
  if (text === "" || !text) return;
  if (Number.isInteger(text)) return text;
  const adjustedText = text
    .split(/-|_/)
    .join(" ")
    .replace(text[0], text[0].toUpperCase());
  return adjustedText;
}

export function displayPokemonMoves(moves) {
  let arr = [];

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < moves[i].version_group_details.length; j++) {
      if (
        moves[i].version_group_details[j].move_learn_method.name === "level-up"
      ) {
        arr.push({
          move: moves[i].move.name,
          game: moves[i].version_group_details[j].version_group.name,
          level: moves[i].version_group_details[j].level_learned_at,
        });
      }
    }
  }
  //const games = arr.map((element) => element.game);
  const games = [...new Set(arr.map((element) => element.game))];

  return { games, arr };
}

export function displayMoveDetails(descriptions) {
  let arr = [];
  for (let i = 0; i < descriptions.length; i++) {
    if (descriptions[i].language.name === "en") {
      arr.push({
        game: descriptions[i].version_group.name,
        description: descriptions[i].flavor_text,
      });
    }
  }
  const games = [...new Set(arr.map((element) => element.game))];
  return { arr, games };
}

export function displayNotFalsyMapEntries(evolutionDetails) {
  let key;

  let obj = [];
  for (let i = 0; i < evolutionDetails.length; i++) {
    let entry = [];
    let mapValues = [];
    for (key in evolutionDetails[i].evolution_details[0]) {
      if (
        evolutionDetails[i].evolution_details[0][key] !== null &&
        evolutionDetails[i].evolution_details[0][key] !== false &&
        evolutionDetails[i].evolution_details[0][key] !== ""
      ) {
        entry.push(key);
      }
    }
    for (let j = 0; j < entry.length; j++) {
      mapValues.push({
        property: entry[j],
        value: evolutionDetails[i].evolution_details[0][entry[j]],
      });
    }
    obj.push({
      name: evolutionDetails[i].species.name,
      id: evolutionDetails[i].species.url.split("/").at(-2),
      requirements: mapValues,
    });
  }

  return obj;
}

export function displayLocations(locations) {
  let obj = [];

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[i].version_details.length; j++) {
      let array = [];
      for (
        let k = 0;
        k < locations[i].version_details[j].encounter_details.length;
        k++
      ) {
        array.push(
          locations[i].version_details[j].encounter_details[k].max_level
        );
      }
      obj.push({
        location: locations[i].location_area.name,
        game: locations[i].version_details[j].version.name,
        maxLevels: array.reduce((acc, val) => (acc > val ? acc : val)),
      });
    }
  }

  const games = [...new Set(obj.map((element) => element.game))];
  return { obj, games };
}

export function displayLocationDetails(locations, gameName, locationName) {
  let arr = [];
  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[i].version_details.length; j++) {
      for (
        let k = 0;
        k < locations[i].version_details[j].encounter_details.length;
        k++
      ) {
        arr.push({
          location: locations[i].location_area.name,
          game: locations[i].version_details[j].version.name,
          maxLevel:
            locations[i].version_details[j].encounter_details[k].max_level,
          minLevel:
            locations[i].version_details[j].encounter_details[k].min_level,
          method:
            locations[i].version_details[j].encounter_details[k].method.name,
          conditions:
            locations[i].version_details[j].encounter_details[k]
              .condition_values[0]?.name || "not specified",
        });
      }
    }
  }

  const gameFilter = arr.filter((el) => el.game === gameName);
  const gameFilterLocation = gameFilter.filter(
    (el) => el.location === locationName
  );

  const filteredMethods = [
    ...new Set(gameFilterLocation.map((el) => el.method)),
  ];
  const filteredConditions = [
    ...new Set(gameFilterLocation.map((el) => el.conditions)),
  ];

  let final2 = [];
  for (let i = 0; i < filteredMethods.length; i++) {
    let final = [];
    for (let j = 0; j < filteredConditions.length; j++) {
      const filteredArrayMethods = gameFilterLocation.filter(
        (array) => array.method === filteredMethods[i]
      );
      const filteredArrayConditions = filteredArrayMethods.filter(
        (array) => array.conditions === filteredConditions[j]
      );
      if (filteredArrayConditions.length > 0) {
        const maxLevels = filteredArrayConditions.map((el) => el.maxLevel);
        const minLevels = filteredArrayConditions.map((el) => el.minLevel);

        const inProgress = {
          location: filteredArrayConditions[0].location,
          game: filteredArrayConditions[0].game,
          maxLevel: maxLevels.reduce((acc, val) => (acc > val ? acc : val)),
          minLevel: minLevels.reduce((acc, val) => (acc < val ? acc : val)),
          method: filteredArrayConditions[0].method,
          conditions: filteredArrayConditions[0].conditions,
        };
        final.push(inProgress);
      }
    }
    final2.push(...final);
  }

  return final2;
}

export function displayPokemonsByType(pokemonList) {
  if (!pokemonList) return;
  let arr = [];

  for (let i = 0; i < pokemonList.length; i++) {
    arr.push({
      name: pokemonList[i].pokemon.name,
      id: pokemonList[i].pokemon.url.split("/").at(-2),
    });
  }
  const final = arr.filter((el) => Number(el.id) < 1003);
  return final;
}

export function displayTmHm(moves) {
  let arr = [];

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < moves[i].version_group_details.length; j++) {
      if (
        moves[i].version_group_details[j].move_learn_method.name !== "level-up"
      )
        arr.push({
          move: moves[i].move.name,
          method: moves[i].version_group_details[j].move_learn_method.name,
          game: moves[i].version_group_details[j].version_group.name,
        });
    }
  }
  const games = [...new Set(arr.map((el) => el.game))];
  return { games, arr };
}
