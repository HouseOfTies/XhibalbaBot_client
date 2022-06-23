import imageSearchService from "@/services/imageSearchService";

export default async function imageSearchWorker(query: string) {
  try {
    const requestedObject = await imageSearchService(query);
    const { contentUrl } = await requestedObject.data.value[0];

    const response = `
[🔭](${contentUrl}) He encontrado esta imagen
    `;

    return response;
  } catch (workerError) {
    console.log(workerError);
    return "No he podido encontrar la imagen especificada, intenta con otro titulo.";
  }
}
