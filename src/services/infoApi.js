import { BASE_URL } from "../utils/Constants";

export async function getPokemonInfo(id) {
  const res = await fetch(`${BASE_URL}pokemon/${id}`);
  if (res.status === 404) {
    throw new Error("Pokemon id not found");
  }
  const data = await res.json();
  return data;
}
export async function getPokemonTypeInfo(typeName) {
  const res = await fetch(`${BASE_URL}type/${typeName}`);
  const data = await res.json();
  return data;
}

export async function getPokemonDescription(id) {
  const res = await fetch(`${BASE_URL}pokemon-species/${id}`);
  const data = await res.json();
  return data;
}

export async function getAttackDescription(name) {
  const res = await fetch(`${BASE_URL}move/${name}`);
  const data = await res.json();
  return data;
}
export async function getEvolutions(chainId) {
  const res = await fetch(`${BASE_URL}evolution-chain/${chainId}`);
  if (res.status === 404) {
    throw new Error("Pokemon id not found");
  }
  const data = await res.json();
  return data;
}
export async function getLocations(pokemonID) {
  const res = await fetch(`${BASE_URL}pokemon/${pokemonID}/encounters`);
  if (res.status === 404) {
    throw new Error("Pokemon id not found");
  }
  const data = await res.json();
  return data;
}

export async function getPokemonsByType(typeName) {
  const res = await fetch(`${BASE_URL}type/${typeName}`);
  const data = await res.json();
  return data;
}
