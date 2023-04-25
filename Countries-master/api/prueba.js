router.get("/countries", async (req, res) => {
	try {
		await countriesToDb(); // Espera a que se complete la carga de la base de datos antes de hacer la consulta
		const name = req.query.name;
		if (!name) {
			const countries = await Country.findAll({
				include: [
					{
						model: Activity,
						attributes: ["name", "difficulty", "duration", "season"],
						through: { attributes: [] },
					},
				],
			});
			if (countries) {
				return res.status(200).json(countries);
			} else {
				return res.status(404).send("No se encontró paises");
			}
		} else {
			const country = await Country.findAll({
				where: {
					name: { [Op.substring]: name },
				},
				include: [
					{
						model: Activity,
						attributes: ["name", "difficulty", "duration", "season"],
						through: { attributes: [] },
					},
				],
			});
			if (country) {
				return res.status(200).json(country);
			} else {
				return res.status(404).send("País no encontrado");
			}
		}
	} catch (error) {
		console.log(error);
	}
});
