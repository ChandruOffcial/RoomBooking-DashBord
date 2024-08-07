import supabase, { supabaseUrl } from "./supabase";

// Get all Cabins
export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

// Delete Cabin
export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be Deleted..!");
	}
}

// Create and Edit Cabin
export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
	const newImageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "");
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${newImageName}`;

	// Create Cabin
	let query = supabase.from("cabins");
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be Created..!");
	}

	if (hasImagePath) return data;
	// Image Upload
	const { error: imageUploadError } = await supabase.storage.from("cabin-images").upload(newImageName, newCabin.image);
	if (imageUploadError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(imageUploadError);
		throw new Error("Image could not be Uploaded..!");
	}

	return data;
}
