// ─────────────────────────────────────────────
// PLANTalytics i18n — client-side translations
// Languages: en, es, fr, de, pt, ja, zh, hi, te
// ─────────────────────────────────────────────

const I18N = {
  // ── Header ──
  "header.title":         { en:"PLANTalytics Explorer", es:"Explorador PLANTalytics", fr:"Explorateur PLANTalytics", de:"PLANTalytics Explorer", pt:"Explorador PLANTalytics", ja:"PLANTalytics エクスプローラー", zh:"PLANTalytics 探索器", hi:"PLANTalytics एक्सप्लोरर", te:"PLANTalytics ఎక్స్‌ప్లోరర్" },
  "header.badge":         { en:"Apache ECharts · Live CSV", es:"Apache ECharts · CSV en vivo", fr:"Apache ECharts · CSV en direct", de:"Apache ECharts · Live CSV", pt:"Apache ECharts · CSV ao vivo", ja:"Apache ECharts · ライブCSV", zh:"Apache ECharts · 实时CSV", hi:"Apache ECharts · लाइव CSV", te:"Apache ECharts · లైవ్ CSV" },
  "header.sub":           { en:"Explore 7,400+ plants by zone, edibility & use", es:"Explora más de 7,400 plantas por zona, comestibilidad y uso", fr:"Explorez plus de 7 400 plantes par zone, comestibilité et usage", de:"Entdecken Sie über 7.400 Pflanzen nach Zone, Essbarkeit & Nutzung", pt:"Explore mais de 7.400 plantas por zona, comestibilidade e uso", ja:"7,400以上の植物をゾーン・食用性・用途別に探索", zh:"按区域、可食用性和用途探索7,400+种植物", hi:"ज़ोन, खाद्यता और उपयोग के आधार पर 7,400+ पौधों का अन्वेषण करें", te:"జోన్, ఆహారయోగ్యత & ఉపయోగం ద్వారా 7,400+ మొక్కలను అన్వేషించండి" },
  "header.home":          { en:" Home", es:" Inicio", fr:" Accueil", de:" Startseite", pt:" Início", ja:" ホーム", zh:" 首页", hi:" होम", te:" హోమ్" },
  "header.powerbi":       { en:" Power BI", es:" Power BI", fr:" Power BI", de:" Power BI", pt:" Power BI", ja:" Power BI", zh:" Power BI", hi:" Power BI", te:" Power BI" },
  "header.planthealth":   { en:" Plant Health", es:" Salud Vegetal", fr:" Santé des Plantes", de:" Pflanzengesundheit", pt:" Saúde Vegetal", ja:" 植物の健康", zh:" 植物健康", hi:" पौधों का स्वास्थ्य", te:" మొక్కల ఆరోగ్యం" },

  // ── Banner ──
  "banner.datafrom":      { en:"Data from", es:"Datos de", fr:"Données de", de:"Daten von", pt:"Dados de", ja:"データ元", zh:"数据来自", hi:"डेटा स्रोत", te:"డేటా మూలం" },
  "banner.zip":           { en:"ZIP", es:"Código postal", fr:"Code postal", de:"PLZ", pt:"CEP", ja:"郵便番号", zh:"邮编", hi:"पिन कोड", te:"పిన్ కోడ్" },
  "banner.enterzip":      { en:"Enter ZIP", es:"Ingrese código", fr:"Code postal", de:"PLZ eingeben", pt:"Insira o CEP", ja:"郵便番号入力", zh:"输入邮编", hi:"पिन दर्ज करें", te:"పిన్ నమోదు" },
  "banner.findzone":      { en:"Find zone", es:"Buscar zona", fr:"Trouver la zone", de:"Zone finden", pt:"Encontrar zona", ja:"ゾーン検索", zh:"查找区域", hi:"ज़ोन खोजें", te:"జోన్ కనుగొనండి" },
  "banner.tip":           { en:"Enter your ZIP to find plants for your zone.", es:"Ingrese su código postal para encontrar plantas para su zona.", fr:"Entrez votre code postal pour trouver des plantes pour votre zone.", de:"Geben Sie Ihre PLZ ein, um Pflanzen für Ihre Zone zu finden.", pt:"Insira seu CEP para encontrar plantas para sua zona.", ja:"郵便番号を入力して、あなたのゾーンの植物を見つけましょう。", zh:"输入邮编以查找适合您区域的植物。", hi:"अपने ज़ोन के पौधे खोजने के लिए पिन कोड दर्ज करें।", te:"మీ జోన్ మొక్కలను కనుగొనడానికి పిన్ కోడ్ నమోదు చేయండి." },
  "banner.tipmob":        { en:"Enter ZIP below to find plants for your zone.", es:"Ingrese código postal abajo para encontrar plantas.", fr:"Entrez votre code postal ci-dessous.", de:"PLZ unten eingeben, um Pflanzen zu finden.", pt:"Insira o CEP abaixo para encontrar plantas.", ja:"下に郵便番号を入力して植物を探す。", zh:"在下方输入邮编查找植物。", hi:"पौधे खोजने के लिए नीचे पिन दर्ज करें।", te:"మొక్కలను కనుగొనడానికి క్రింద పిన్ నమోదు చేయండి." },
  "banner.supportpfaf":   { en:"Support PFAF", es:"Apoyar PFAF", fr:"Soutenir PFAF", de:"PFAF unterstützen", pt:"Apoiar PFAF", ja:"PFAFを支援", zh:"支持PFAF", hi:"PFAF का समर्थन करें", te:"PFAF కి మద్దతు" },
  "banner.trackhealth":   { en:"Track Plant Health → Sproutcast", es:"Seguir Salud Vegetal → Sproutcast", fr:"Suivre la Santé → Sproutcast", de:"Pflanzengesundheit → Sproutcast", pt:"Monitorar Saúde → Sproutcast", ja:"植物の健康管理 → Sproutcast", zh:"追踪植物健康 → Sproutcast", hi:"पौधों की सेहत → Sproutcast", te:"మొక్కల ఆరోగ్యం → Sproutcast" },

  // ── Loader ──
  "loader.text":          { en:"Loading plant data…", es:"Cargando datos de plantas…", fr:"Chargement des données…", de:"Pflanzendaten werden geladen…", pt:"Carregando dados…", ja:"植物データを読み込み中…", zh:"正在加载植物数据…", hi:"पौधों का डेटा लोड हो रहा है…", te:"మొక్కల డేటా లోడ్ అవుతోంది…" },

  // ── Filter Panel ──
  "filter.filters":       { en:"Filters", es:"Filtros", fr:"Filtres", de:"Filter", pt:"Filtros", ja:"フィルター", zh:"筛选", hi:"फ़िल्टर", te:"ఫిల్టర్లు" },
  "filter.location":      { en:"Location", es:"Ubicación", fr:"Emplacement", de:"Standort", pt:"Localização", ja:"場所", zh:"位置", hi:"स्थान", te:"స్థానం" },
  "filter.ziptozone":     { en:"ZIP Code → Zone", es:"Código Postal → Zona", fr:"Code Postal → Zone", de:"PLZ → Zone", pt:"CEP → Zona", ja:"郵便番号 → ゾーン", zh:"邮编 → 区域", hi:"पिन कोड → ज़ोन", te:"పిన్ కోడ్ → జోన్" },
  "filter.zipplaceholder":{ en:"e.g. 90210", es:"ej. 90210", fr:"ex. 75001", de:"z.B. 10115", pt:"ex. 01000", ja:"例: 100-0001", zh:"例: 100000", hi:"जैसे 110001", te:"ఉదా. 500001" },
  "filter.country":       { en:"Country", es:"País", fr:"Pays", de:"Land", pt:"País", ja:"国", zh:"国家", hi:"देश", te:"దేశం" },
  "filter.selectcountry": { en:"Select a country…", es:"Seleccionar país…", fr:"Sélectionner un pays…", de:"Land auswählen…", pt:"Selecionar país…", ja:"国を選択…", zh:"选择国家…", hi:"देश चुनें…", te:"దేశాన్ని ఎంచుకోండి…" },
  "filter.search":        { en:"Search", es:"Buscar", fr:"Recherche", de:"Suche", pt:"Pesquisar", ja:"検索", zh:"搜索", hi:"खोज", te:"శోధన" },
  "filter.nameplaceholder":{ en:"e.g. Oak, Quercus…", es:"ej. Roble, Quercus…", fr:"ex. Chêne, Quercus…", de:"z.B. Eiche, Quercus…", pt:"ex. Carvalho, Quercus…", ja:"例: オーク, Quercus…", zh:"例: 橡树, Quercus…", hi:"जैसे ओक, Quercus…", te:"ఉదా. ఓక్, Quercus…" },
  "filter.commonlatin":   { en:"Common or Latin name", es:"Nombre común o latino", fr:"Nom commun ou latin", de:"Allgemein- oder Lateinischer Name", pt:"Nome comum ou latino", ja:"一般名またはラテン名", zh:"通用名或拉丁名", hi:"सामान्य या लैटिन नाम", te:"సామాన్య లేదా లాటిన్ పేరు" },
  "filter.hardinesszone": { en:"Hardiness Zone", es:"Zona de Resistencia", fr:"Zone de Rusticité", de:"Winterhärtezone", pt:"Zona de Rusticidade", ja:"耐寒ゾーン", zh:"耐寒区", hi:"कठोरता ज़ोन", te:"కఠినత్వ జోన్" },
  "filter.clickzone":     { en:"Click zone to filter", es:"Haga clic en zona para filtrar", fr:"Cliquez sur une zone pour filtrer", de:"Klicken Sie auf Zone zum Filtern", pt:"Clique na zona para filtrar", ja:"ゾーンをクリックしてフィルター", zh:"点击区域筛选", hi:"फ़िल्टर करने के लिए ज़ोन पर क्लिक करें", te:"ఫిల్టర్ చేయడానికి జోన్ క్లిక్ చేయండి" },
  "filter.zone1coldest":  { en:"Zone 1 (coldest)", es:"Zona 1 (más fría)", fr:"Zone 1 (la plus froide)", de:"Zone 1 (kälteste)", pt:"Zona 1 (mais fria)", ja:"ゾーン1（最寒）", zh:"区域1（最冷）", hi:"ज़ोन 1 (सबसे ठंडा)", te:"జోన్ 1 (అత్యంత శీతల)" },
  "filter.zone13hottest": { en:"Zone 13 (hottest)", es:"Zona 13 (más cálida)", fr:"Zone 13 (la plus chaude)", de:"Zone 13 (wärmste)", pt:"Zona 13 (mais quente)", ja:"ゾーン13（最暖）", zh:"区域13（最热）", hi:"ज़ोन 13 (सबसे गर्म)", te:"జోన్ 13 (అత్యంత వేడి)" },
  "filter.plantchars":    { en:"Plant Characteristics", es:"Características de Plantas", fr:"Caractéristiques des Plantes", de:"Pflanzeneigenschaften", pt:"Características das Plantas", ja:"植物の特徴", zh:"植物特征", hi:"पौधों की विशेषताएँ", te:"మొక్కల లక్షణాలు" },
  "filter.planttype":     { en:"Plant Type", es:"Tipo de Planta", fr:"Type de Plante", de:"Pflanzentyp", pt:"Tipo de Planta", ja:"植物タイプ", zh:"植物类型", hi:"पौधे का प्रकार", te:"మొక్క రకం" },
  "filter.alltypes":      { en:"All Types", es:"Todos los Tipos", fr:"Tous les Types", de:"Alle Typen", pt:"Todos os Tipos", ja:"すべてのタイプ", zh:"所有类型", hi:"सभी प्रकार", te:"అన్ని రకాలు" },
  "filter.growthrate":    { en:"Growth Rate", es:"Tasa de Crecimiento", fr:"Taux de Croissance", de:"Wachstumsrate", pt:"Taxa de Crescimento", ja:"成長速度", zh:"生长速度", hi:"विकास दर", te:"వృద్ధి రేటు" },
  "filter.allrates":      { en:"All Rates", es:"Todas las Tasas", fr:"Tous les Taux", de:"Alle Raten", pt:"Todas as Taxas", ja:"すべての速度", zh:"所有速度", hi:"सभी दरें", te:"అన్ని రేట్లు" },
  "filter.slow":          { en:"Slow", es:"Lento", fr:"Lent", de:"Langsam", pt:"Lento", ja:"遅い", zh:"慢", hi:"धीमा", te:"నెమ్మదిగా" },
  "filter.medium":        { en:"Medium", es:"Medio", fr:"Moyen", de:"Mittel", pt:"Médio", ja:"中程度", zh:"中等", hi:"मध्यम", te:"మధ్యస్థం" },
  "filter.fast":          { en:"Fast", es:"Rápido", fr:"Rapide", de:"Schnell", pt:"Rápido", ja:"速い", zh:"快", hi:"तेज़", te:"వేగంగా" },
  "filter.foliage":       { en:"Foliage", es:"Follaje", fr:"Feuillage", de:"Laub", pt:"Folhagem", ja:"葉", zh:"叶子", hi:"पत्तियाँ", te:"ఆకులు" },
  "filter.all":           { en:"All", es:"Todos", fr:"Tous", de:"Alle", pt:"Todos", ja:"すべて", zh:"全部", hi:"सभी", te:"అన్నీ" },
  "filter.evergreen":     { en:"Evergreen", es:"Perenne", fr:"Persistant", de:"Immergrün", pt:"Sempre-verde", ja:"常緑", zh:"常绿", hi:"सदाबहार", te:"సతత హరితం" },
  "filter.deciduous":     { en:"Deciduous", es:"Caducifolio", fr:"Caduc", de:"Laubabwerfend", pt:"Decíduo", ja:"落葉", zh:"落叶", hi:"पर्णपाती", te:"ఆకురాల్చు" },
  "filter.semievergreen": { en:"Semi-evergreen", es:"Semi-perenne", fr:"Semi-persistant", de:"Halbimmergrün", pt:"Semi-sempre-verde", ja:"半常緑", zh:"半常绿", hi:"अर्ध-सदाबहार", te:"సెమీ-సతత హరితం" },
  "filter.growing":       { en:"Growing Conditions", es:"Condiciones de Cultivo", fr:"Conditions de Culture", de:"Wachstumsbedingungen", pt:"Condições de Cultivo", ja:"栽培条件", zh:"种植条件", hi:"विकास की स्थिति", te:"పెరుగుదల పరిస్థితులు" },
  "filter.soiltype":      { en:"Soil Type", es:"Tipo de Suelo", fr:"Type de Sol", de:"Bodentyp", pt:"Tipo de Solo", ja:"土壌タイプ", zh:"土壤类型", hi:"मिट्टी का प्रकार", te:"నేల రకం" },
  "filter.anysoil":       { en:"Any Soil", es:"Cualquier Suelo", fr:"Tout Sol", de:"Jeder Boden", pt:"Qualquer Solo", ja:"すべての土壌", zh:"任意土壤", hi:"कोई भी मिट्टी", te:"ఏదైనా నేల" },
  "filter.lightsandy":    { en:"Light (Sandy)", es:"Ligero (Arenoso)", fr:"Léger (Sableux)", de:"Leicht (Sandig)", pt:"Leve (Arenoso)", ja:"軽い（砂質）", zh:"轻质（沙质）", hi:"हल्की (रेतीली)", te:"తేలికైన (ఇసుక)" },
  "filter.mediumloam":    { en:"Medium (Loam)", es:"Medio (Franco)", fr:"Moyen (Limoneux)", de:"Mittel (Lehm)", pt:"Médio (Franco)", ja:"中程度（壌土）", zh:"中等（壤土）", hi:"मध्यम (दोमट)", te:"మధ్యస్థ (లోమ్)" },
  "filter.heavycite":     { en:"Heavy (Clay)", es:"Pesado (Arcilla)", fr:"Lourd (Argileux)", de:"Schwer (Ton)", pt:"Pesado (Argila)", ja:"重い（粘土）", zh:"重质（粘土）", hi:"भारी (चिकनी)", te:"భారీ (బంకమట్టి)" },
  "filter.useratings":    { en:"Use Ratings", es:"Calificaciones de Uso", fr:"Évaluations d'Utilisation", de:"Bewertungen", pt:"Avaliações de Uso", ja:"評価", zh:"使用评分", hi:"उपयोग रेटिंग", te:"ఉపయోగ రేటింగ్‌లు" },
  "filter.minedibility":  { en:"Min Edibility", es:"Comestibilidad Mín.", fr:"Comestibilité Min.", de:"Min. Essbarkeit", pt:"Comestibilidade Mín.", ja:"最小食用性", zh:"最低可食用性", hi:"न्यूनतम खाद्यता", te:"కనీస ఆహారయోగ్యత" },
  "filter.minmedicinal":  { en:"Min Medicinal", es:"Medicinal Mín.", fr:"Médicinal Min.", de:"Min. Medizinisch", pt:"Medicinal Mín.", ja:"最小薬用性", zh:"最低药用性", hi:"न्यूनतम औषधीय", te:"కనీస ఔషధ" },
  "filter.activefilters": { en:"Active Filters", es:"Filtros Activos", fr:"Filtres Actifs", de:"Aktive Filter", pt:"Filtros Ativos", ja:"有効なフィルター", zh:"已激活筛选", hi:"सक्रिय फ़िल्टर", te:"యాక్టివ్ ఫిల్టర్లు" },
  "filter.none":          { en:"None", es:"Ninguno", fr:"Aucun", de:"Keine", pt:"Nenhum", ja:"なし", zh:"无", hi:"कोई नहीं", te:"ఏదీ లేదు" },
  "filter.clearall":      { en:"Clear All Filters", es:"Borrar Todos los Filtros", fr:"Effacer Tous les Filtres", de:"Alle Filter löschen", pt:"Limpar Todos os Filtros", ja:"すべてのフィルターをクリア", zh:"清除所有筛选", hi:"सभी फ़िल्टर साफ़ करें", te:"అన్ని ఫిల్టర్లు క్లియర్ చేయండి" },
  "filter.exportcsv":     { en:"Export CSV", es:"Exportar CSV", fr:"Exporter CSV", de:"CSV exportieren", pt:"Exportar CSV", ja:"CSV出力", zh:"导出CSV", hi:"CSV निर्यात", te:"CSV ఎగుమతి" },
  "filter.closefilters":  { en:"Close Filters", es:"Cerrar Filtros", fr:"Fermer Filtres", de:"Filter schließen", pt:"Fechar Filtros", ja:"フィルターを閉じる", zh:"关闭筛选", hi:"फ़िल्टर बंद करें", te:"ఫిల్టర్లు మూసివేయండి" },
  "filter.language":      { en:"Language", es:"Idioma", fr:"Langue", de:"Sprache", pt:"Idioma", ja:"言語", zh:"语言", hi:"भाषा", te:"భాష" },

  // ── Quick Filter Bar ──
  "qf.hardinesszone":     { en:"Hardiness Zone", es:"Zona de Resistencia", fr:"Zone de Rusticité", de:"Winterhärtezone", pt:"Zona de Rusticidade", ja:"耐寒ゾーン", zh:"耐寒区", hi:"कठोरता ज़ोन", te:"కఠినత్వ జోన్" },
  "qf.advfilters":        { en:"Filters", es:"Filtros", fr:"Filtres", de:"Filter", pt:"Filtros", ja:"フィルター", zh:"筛选", hi:"फ़िल्टर", te:"ఫిల్టర్లు" },
  "qf.advanced":          { en:"Advanced", es:"Avanzados", fr:"Avancés", de:"Erweitert", pt:"Avançados", ja:"詳細", zh:"高级", hi:"उन्नत", te:"అధునాతన" },

  // ── Stat Row ──
  "stat.plants":          { en:"Plants", es:"Plantas", fr:"Plantes", de:"Pflanzen", pt:"Plantas", ja:"植物", zh:"植物", hi:"पौधे", te:"మొక్కలు" },
  "stat.edible":          { en:"Edible ≥3", es:"Comestible ≥3", fr:"Comestible ≥3", de:"Essbar ≥3", pt:"Comestível ≥3", ja:"食用 ≥3", zh:"可食用 ≥3", hi:"खाद्य ≥3", te:"ఆహారయోగ్యం ≥3" },
  "stat.medicinal":       { en:"Medicinal ≥3", es:"Medicinal ≥3", fr:"Médicinal ≥3", de:"Medizinisch ≥3", pt:"Medicinal ≥3", ja:"薬用 ≥3", zh:"药用 ≥3", hi:"औषधीय ≥3", te:"ఔషధ ≥3" },
  "stat.pollinators":     { en:"Pollinators", es:"Polinizadores", fr:"Pollinisateurs", de:"Bestäuber", pt:"Polinizadores", ja:"花粉媒介者", zh:"传粉者", hi:"परागणकर्ता", te:"పరాగ సంపర్కులు" },

  // ── Chart Titles ──
  "chart.typelandscape":  { en:"Plant Type Landscape", es:"Paisaje de Tipos de Plantas", fr:"Paysage des Types de Plantes", de:"Pflanzentyp-Landschaft", pt:"Paisagem de Tipos de Plantas", ja:"植物タイプの景観", zh:"植物类型景观", hi:"पौधे के प्रकार का परिदृश्य", te:"మొక్క రకం ప్రకృతి దృశ్యం" },
  "chart.topfamilies":    { en:"Top Plant Families", es:"Principales Familias de Plantas", fr:"Principales Familles de Plantes", de:"Top-Pflanzenfamilien", pt:"Principais Famílias de Plantas", ja:"主要植物科", zh:"主要植物科", hi:"शीर्ष पौधा परिवार", te:"అగ్ర మొక్కల కుటుంబాలు" },
  "chart.calendar":       { en:"Bloom & Harvest Calendar", es:"Calendario de Floración y Cosecha", fr:"Calendrier de Floraison et Récolte", de:"Blüte- & Erntekalender", pt:"Calendário de Floração e Colheita", ja:"開花＆収穫カレンダー", zh:"花期和收获日历", hi:"खिलने और फसल कटाई का कैलेंडर", te:"పుష్పించే & పంట క్యాలెండర్" },
  "chart.scatter":        { en:"Edibility × Medicinal Value", es:"Comestibilidad × Valor Medicinal", fr:"Comestibilité × Valeur Médicinale", de:"Essbarkeit × Medizinischer Wert", pt:"Comestibilidade × Valor Medicinal", ja:"食用性 × 薬用価値", zh:"可食用性 × 药用价值", hi:"खाद्यता × औषधीय मूल्य", te:"ఆహారయోగ్యత × ఔషధ విలువ" },
  "chart.growthrate":     { en:"Plant Type & Growth Rate", es:"Tipo de Planta y Tasa de Crecimiento", fr:"Type de Plante et Taux de Croissance", de:"Pflanzentyp & Wachstumsrate", pt:"Tipo de Planta e Taxa de Crescimento", ja:"植物タイプ＆成長速度", zh:"植物类型和生长速度", hi:"पौधे का प्रकार और विकास दर", te:"మొక్క రకం & వృద్ధి రేటు" },
  "chart.pollinators":    { en:"Pollinator Support", es:"Apoyo a Polinizadores", fr:"Soutien aux Pollinisateurs", de:"Bestäuber-Unterstützung", pt:"Apoio a Polinizadores", ja:"花粉媒介者サポート", zh:"传粉者支持", hi:"परागणकर्ता समर्थन", te:"పరాగ సంపర్క మద్దతు" },
  "chart.toppicks":       { en:"Top Picks for Your Selection", es:"Mejores Selecciones para su Filtro", fr:"Meilleurs Choix pour votre Sélection", de:"Top-Auswahl für Ihre Filterung", pt:"Melhores Escolhas para sua Seleção", ja:"あなたの選択に最適な植物", zh:"您的最佳选择", hi:"आपके चयन के लिए शीर्ष चुनाव", te:"మీ ఎంపిక కోసం అగ్ర ఎంపికలు" },

  // ── Chart Footers ──
  "foot.typehint":        { en:"Click a type tab to filter · click a card to open its plant page", es:"Clic en una pestaña para filtrar · clic en una tarjeta para abrir la página", fr:"Cliquez sur un onglet pour filtrer · cliquez sur une carte pour ouvrir la page", de:"Klicken Sie auf einen Tab zum Filtern · Karte anklicken für Pflanzenseite", pt:"Clique em uma aba para filtrar · clique em um card para abrir a página", ja:"タブをクリックしてフィルター · カードをクリックして植物ページを開く", zh:"点击标签页筛选 · 点击卡片打开植物页面", hi:"फ़िल्टर के लिए टैब पर क्लिक करें · कार्ड पर क्लिक करें", te:"ఫిల్టర్ చేయడానికి ట్యాబ్ క్లిక్ చేయండి · కార్డ్ క్లిక్ చేయండి" },
  "foot.familyhint":      { en:"Click a slice to filter all charts by family", es:"Clic en un segmento para filtrar por familia", fr:"Cliquez sur une part pour filtrer par famille", de:"Klicken Sie auf ein Segment zum Filtern nach Familie", pt:"Clique em uma fatia para filtrar por família", ja:"セグメントをクリックして科でフィルター", zh:"点击扇区按科筛选", hi:"परिवार के अनुसार फ़िल्टर करने के लिए स्लाइस पर क्लिक करें", te:"కుటుంబం ప్రకారం ఫిల్టర్ చేయడానికి స్లైస్ క్లిక్ చేయండి" },
  "foot.calendarhint":    { en:"Click a month to filter · Blue = flowering, Green = ripening", es:"Clic en un mes para filtrar · Azul = floración, Verde = maduración", fr:"Cliquez sur un mois pour filtrer · Bleu = floraison, Vert = maturation", de:"Monat anklicken · Blau = Blüte, Grün = Reife", pt:"Clique em um mês · Azul = floração, Verde = amadurecimento", ja:"月をクリック · 青=開花、緑=結実", zh:"点击月份筛选 · 蓝色=开花，绿色=成熟", hi:"महीने पर क्लिक करें · नीला = फूलना, हरा = पकना", te:"నెలను క్లిక్ చేయండి · నీలం = పుష్పించడం, ఆకుపచ్చ = పండటం" },
  "foot.scatterhint":     { en:"Bubble size = Other Uses score · Top-right = best food and medicine plants", es:"Tamaño = puntuación Otros Usos · Superior derecha = mejores plantas", fr:"Taille = Autres usages · En haut à droite = meilleures plantes", de:"Blasengröße = Andere Nutzung · Rechts oben = beste Pflanzen", pt:"Tamanho = Outros usos · Superior direito = melhores plantas", ja:"バブルサイズ=その他の用途 · 右上=最良の食用・薬用植物", zh:"气泡大小=其他用途评分 · 右上角=最佳食药两用植物", hi:"बबल का आकार = अन्य उपयोग · ऊपर-दाएं = सर्वोत्तम पौधे", te:"బబుల్ పరిమాణం = ఇతర ఉపయోగాలు · కుడి-ఎగువ = ఉత్తమ మొక్కలు" },
  "foot.growthhint":      { en:"Click a bar segment to filter by plant type", es:"Clic en un segmento para filtrar por tipo de planta", fr:"Cliquez sur un segment pour filtrer par type", de:"Segment anklicken zum Filtern nach Pflanzentyp", pt:"Clique em um segmento para filtrar por tipo", ja:"バーセグメントをクリックしてタイプでフィルター", zh:"点击柱状图按类型筛选", hi:"पौधे के प्रकार के अनुसार फ़िल्टर करने के लिए बार पर क्लिक करें", te:"మొక్క రకం ప్రకారం ఫిల్టర్ చేయడానికి బార్ క్లిక్ చేయండి" },
  "foot.pollinatorhint":  { en:"Click a bar to filter by pollinator type", es:"Clic en una barra para filtrar por tipo de polinizador", fr:"Cliquez sur une barre pour filtrer par pollinisateur", de:"Balken anklicken zum Filtern nach Bestäubertyp", pt:"Clique em uma barra para filtrar por polinizador", ja:"バーをクリックして花粉媒介者でフィルター", zh:"点击条形按传粉者筛选", hi:"बार पर क्लिक करें", te:"పరాగ సంపర్క రకం ప్రకారం బార్ క్లిక్ చేయండి" },
  "foot.toppickshint":    { en:"Sorted by Utility Score (Edibility + Medicinal + OtherUses). Showing top 50 from filtered set.", es:"Ordenado por Puntuación de Utilidad. Mostrando los 50 mejores.", fr:"Trié par Score d'Utilité. Affichage des 50 premiers.", de:"Sortiert nach Nutzen-Score. Top 50 angezeigt.", pt:"Ordenado por Pontuação de Utilidade. Mostrando os 50 melhores.", ja:"有用度スコアで並べ替え。フィルター結果の上位50件。", zh:"按效用评分排序。显示筛选后的前50项。", hi:"उपयोगिता स्कोर के अनुसार क्रमबद्ध। शीर्ष 50 दिखा रहा है।", te:"యుటిలిటీ స్కోర్ ప్రకారం క్రమబద్ధం. ఫిల్టర్ చేసిన 50 అగ్ర ఫలితాలు." },

  // ── Table Headers ──
  "table.rank":           { en:"#", es:"#", fr:"#", de:"#", pt:"#", ja:"#", zh:"#", hi:"#", te:"#" },
  "table.commonname":     { en:"Common Name", es:"Nombre Común", fr:"Nom Commun", de:"Allgemeinname", pt:"Nome Comum", ja:"一般名", zh:"通用名", hi:"सामान्य नाम", te:"సామాన్య పేరు" },
  "table.familyspecies":  { en:"Family / Species", es:"Familia / Especie", fr:"Famille / Espèce", de:"Familie / Art", pt:"Família / Espécie", ja:"科 / 種", zh:"科 / 种", hi:"परिवार / प्रजाति", te:"కుటుంబం / జాతి" },
  "table.type":           { en:"Type", es:"Tipo", fr:"Type", de:"Typ", pt:"Tipo", ja:"タイプ", zh:"类型", hi:"प्रकार", te:"రకం" },
  "table.zone":           { en:"Zone", es:"Zona", fr:"Zone", de:"Zone", pt:"Zona", ja:"ゾーン", zh:"区域", hi:"ज़ोन", te:"జోన్" },
  "table.edibility":      { en:"Edibility", es:"Comestibilidad", fr:"Comestibilité", de:"Essbarkeit", pt:"Comestibilidade", ja:"食用性", zh:"可食用性", hi:"खाद्यता", te:"ఆహారయోగ్యత" },
  "table.medicinal":      { en:"Medicinal", es:"Medicinal", fr:"Médicinal", de:"Medizinisch", pt:"Medicinal", ja:"薬用", zh:"药用", hi:"औषधीय", te:"ఔషధ" },
  "table.otheruses":      { en:"Other Uses", es:"Otros Usos", fr:"Autres Usages", de:"Andere Nutzung", pt:"Outros Usos", ja:"その他の用途", zh:"其他用途", hi:"अन्य उपयोग", te:"ఇతర ఉపయోగాలు" },
  "table.utilityscore":   { en:"Utility Score", es:"Puntuación Utilidad", fr:"Score d'Utilité", de:"Nutzen-Score", pt:"Pontuação Utilidade", ja:"有用度スコア", zh:"效用评分", hi:"उपयोगिता स्कोर", te:"యుటిలిటీ స్కోర్" },
  "table.link":           { en:"Link", es:"Enlace", fr:"Lien", de:"Link", pt:"Link", ja:"リンク", zh:"链接", hi:"लिंक", te:"లింక్" },

  // ── Plant Type Names (data labels) ──
  "type.deciduoustree":   { en:"Deciduous Tree", es:"Árbol Caducifolio", fr:"Arbre Caduc", de:"Laubbaum", pt:"Árvore Decídua", ja:"落葉樹", zh:"落叶乔木", hi:"पर्णपाती वृक्ष", te:"ఆకురాల్చు చెట్టు" },
  "type.evergreentree":   { en:"Evergreen Tree", es:"Árbol Perenne", fr:"Arbre Persistant", de:"Nadelbaum", pt:"Árvore Perene", ja:"常緑樹", zh:"常绿乔木", hi:"सदाबहार वृक्ष", te:"సతత హరిత చెట్టు" },
  "type.deciduousshrub":  { en:"Deciduous Shrub", es:"Arbusto Caducifolio", fr:"Arbuste Caduc", de:"Laubstrauch", pt:"Arbusto Decíduo", ja:"落葉低木", zh:"落叶灌木", hi:"पर्णपाती झाड़ी", te:"ఆకురాల్చు పొద" },
  "type.evergreenshrub":  { en:"Evergreen Shrub", es:"Arbusto Perenne", fr:"Arbuste Persistant", de:"Immergrüner Strauch", pt:"Arbusto Perene", ja:"常緑低木", zh:"常绿灌木", hi:"सदाबहार झाड़ी", te:"సతత హరిత పొద" },
  "type.climbervine":     { en:"Climber / Vine", es:"Trepadora / Enredadera", fr:"Grimpante / Liane", de:"Kletterpflanze / Rebe", pt:"Trepadeira / Videira", ja:"つる植物", zh:"攀援植物/藤蔓", hi:"बेल / लता", te:"తీగ / వల్లి" },
  "type.perennial":       { en:"Perennial", es:"Perenne", fr:"Vivace", de:"Staude", pt:"Perene", ja:"多年生", zh:"多年生", hi:"बहुवर्षीय", te:"బహువార్షిక" },
  "type.annualbiennial":  { en:"Annual / Biennial", es:"Anual / Bienal", fr:"Annuelle / Bisannuelle", de:"Einjährig / Zweijährig", pt:"Anual / Bienal", ja:"一年生/二年生", zh:"一年生/二年生", hi:"वार्षिक / द्विवार्षिक", te:"వార్షిక / ద్వివార్షిక" },
  "type.bulbcorm":        { en:"Bulb / Corm", es:"Bulbo / Cormo", fr:"Bulbe / Corme", de:"Zwiebel / Knolle", pt:"Bulbo / Cormo", ja:"球根", zh:"球茎", hi:"कंद / बल्ब", te:"బల్బ్ / కార్మ్" },
  "type.grasssedge":      { en:"Grass / Sedge", es:"Hierba / Junco", fr:"Graminée / Carex", de:"Gras / Segge", pt:"Grama / Junco", ja:"草/スゲ", zh:"草/莎草", hi:"घास / सेज", te:"గడ్డి / సెడ్జ్" },
  "type.fernmoss":        { en:"Fern / Moss", es:"Helecho / Musgo", fr:"Fougère / Mousse", de:"Farn / Moos", pt:"Samambaia / Musgo", ja:"シダ/コケ", zh:"蕨类/苔藓", hi:"फर्न / काई", te:"ఫెర్న్ / నాచు" },
  "type.otherunknown":    { en:"Other / Unknown", es:"Otro / Desconocido", fr:"Autre / Inconnu", de:"Andere / Unbekannt", pt:"Outro / Desconhecido", ja:"その他/不明", zh:"其他/未知", hi:"अन्य / अज्ञात", te:"ఇతర / తెలియనిది" },

  // ── Photo Grid ──
  "grid.all":             { en:"All", es:"Todos", fr:"Tous", de:"Alle", pt:"Todos", ja:"すべて", zh:"全部", hi:"सभी", te:"అన్నీ" },
  "grid.noresults":       { en:"No plants match current filters", es:"No hay plantas que coincidan con los filtros actuales", fr:"Aucune plante ne correspond aux filtres actuels", de:"Keine Pflanzen entsprechen den aktuellen Filtern", pt:"Nenhuma planta corresponde aos filtros atuais", ja:"現在のフィルターに一致する植物はありません", zh:"没有符合当前筛选条件的植物", hi:"वर्तमान फ़िल्टर से कोई पौधा मेल नहीं खाता", te:"ప్రస్తుత ఫిల్టర్‌లకు సరిపోయే మొక్కలు లేవు" },
  "grid.viewprofile":     { en:"View full plant profile", es:"Ver perfil completo", fr:"Voir le profil complet", de:"Vollständiges Pflanzenprofil anzeigen", pt:"Ver perfil completo", ja:"植物プロフィールを見る", zh:"查看完整植物资料", hi:"पूरा पौधा प्रोफ़ाइल देखें", te:"పూర్తి మొక్క ప్రొఫైల్ చూడండి" },
  "grid.showing":         { en:"Showing", es:"Mostrando", fr:"Affichage de", de:"Zeige", pt:"Exibindo", ja:"表示中", zh:"显示", hi:"दिखा रहा है", te:"చూపుతోంది" },
  "grid.matching":        { en:"plants matching:", es:"plantas que coinciden:", fr:"plantes correspondant à :", de:"Pflanzen passend zu:", pt:"plantas correspondentes a:", ja:"一致する植物:", zh:"匹配的植物:", hi:"मेल खाने वाले पौधे:", te:"సరిపోలే మొక్కలు:" },

  // ── Misc ──
  "misc.dismiss":         { en:"Dismiss", es:"Cerrar", fr:"Fermer", de:"Schließen", pt:"Fechar", ja:"閉じる", zh:"关闭", hi:"बंद करें", te:"మూసివేయండి" },
  "misc.tip":             { en:"Tip:", es:"Consejo:", fr:"Astuce :", de:"Tipp:", pt:"Dica:", ja:"ヒント：", zh:"提示：", hi:"सुझाव:", te:"చిట్కా:" },
  "misc.clear":           { en:"Clear", es:"Borrar", fr:"Effacer", de:"Löschen", pt:"Limpar", ja:"クリア", zh:"清除", hi:"साफ़ करें", te:"క్లియర్" },
};

// ── Supported Language Metadata ──
const I18N_LANGS = [
  { code:'en', label:'English',    flag:'🇺🇸' },
  { code:'es', label:'Español',    flag:'🇪🇸' },
  { code:'fr', label:'Français',   flag:'🇫🇷' },
  { code:'de', label:'Deutsch',    flag:'🇩🇪' },
  { code:'pt', label:'Português',  flag:'🇧🇷' },
  { code:'ja', label:'日本語',      flag:'🇯🇵' },
  { code:'zh', label:'中文',        flag:'🇨🇳' },
  { code:'hi', label:'हिन्दी',      flag:'🇮🇳' },
  { code:'te', label:'తెలుగు',      flag:'🇮🇳' },
];

// ── Country → Hardiness Zone mapping (approximate dominant zone) ──
const COUNTRY_ZONES = [
  { name:"United States", code:"US", zones:"3–10", defaultZone:7 },
  { name:"Canada", code:"CA", zones:"1–8", defaultZone:5 },
  { name:"United Kingdom", code:"GB", zones:"7–9", defaultZone:8 },
  { name:"Germany", code:"DE", zones:"6–8", defaultZone:7 },
  { name:"France", code:"FR", zones:"6–10", defaultZone:8 },
  { name:"Spain", code:"ES", zones:"8–11", defaultZone:9 },
  { name:"Portugal", code:"PT", zones:"8–11", defaultZone:9 },
  { name:"Italy", code:"IT", zones:"7–10", defaultZone:8 },
  { name:"Netherlands", code:"NL", zones:"7–8", defaultZone:8 },
  { name:"Belgium", code:"BE", zones:"7–8", defaultZone:8 },
  { name:"Switzerland", code:"CH", zones:"6–8", defaultZone:7 },
  { name:"Austria", code:"AT", zones:"6–7", defaultZone:6 },
  { name:"Poland", code:"PL", zones:"5–7", defaultZone:6 },
  { name:"Sweden", code:"SE", zones:"3–7", defaultZone:5 },
  { name:"Norway", code:"NO", zones:"3–7", defaultZone:5 },
  { name:"Denmark", code:"DK", zones:"7–8", defaultZone:7 },
  { name:"Finland", code:"FI", zones:"2–5", defaultZone:4 },
  { name:"Ireland", code:"IE", zones:"8–9", defaultZone:8 },
  { name:"Greece", code:"GR", zones:"8–11", defaultZone:9 },
  { name:"Turkey", code:"TR", zones:"5–10", defaultZone:7 },
  { name:"Russia", code:"RU", zones:"1–7", defaultZone:4 },
  { name:"Ukraine", code:"UA", zones:"5–7", defaultZone:6 },
  { name:"Japan", code:"JP", zones:"6–10", defaultZone:8 },
  { name:"South Korea", code:"KR", zones:"6–9", defaultZone:7 },
  { name:"China", code:"CN", zones:"3–11", defaultZone:7 },
  { name:"India", code:"IN", zones:"8–13", defaultZone:10 },
  { name:"Australia", code:"AU", zones:"7–12", defaultZone:10 },
  { name:"New Zealand", code:"NZ", zones:"8–11", defaultZone:9 },
  { name:"South Africa", code:"ZA", zones:"8–12", defaultZone:10 },
  { name:"Brazil", code:"BR", zones:"9–13", defaultZone:11 },
  { name:"Argentina", code:"AR", zones:"7–11", defaultZone:9 },
  { name:"Chile", code:"CL", zones:"7–11", defaultZone:9 },
  { name:"Mexico", code:"MX", zones:"8–12", defaultZone:10 },
  { name:"Colombia", code:"CO", zones:"10–13", defaultZone:11 },
  { name:"Peru", code:"PE", zones:"8–13", defaultZone:10 },
  { name:"Egypt", code:"EG", zones:"9–11", defaultZone:10 },
  { name:"Morocco", code:"MA", zones:"8–11", defaultZone:9 },
  { name:"Kenya", code:"KE", zones:"10–13", defaultZone:11 },
  { name:"Nigeria", code:"NG", zones:"11–13", defaultZone:12 },
  { name:"Thailand", code:"TH", zones:"10–13", defaultZone:11 },
  { name:"Vietnam", code:"VN", zones:"9–13", defaultZone:11 },
  { name:"Indonesia", code:"ID", zones:"11–13", defaultZone:12 },
  { name:"Philippines", code:"PH", zones:"10–13", defaultZone:12 },
  { name:"Malaysia", code:"MY", zones:"11–13", defaultZone:12 },
  { name:"Israel", code:"IL", zones:"8–11", defaultZone:9 },
  { name:"Saudi Arabia", code:"SA", zones:"9–12", defaultZone:10 },
  { name:"UAE", code:"AE", zones:"10–12", defaultZone:11 },
  { name:"Pakistan", code:"PK", zones:"7–12", defaultZone:9 },
  { name:"Bangladesh", code:"BD", zones:"10–13", defaultZone:11 },
  { name:"Sri Lanka", code:"LK", zones:"10–13", defaultZone:11 },
  { name:"Nepal", code:"NP", zones:"5–11", defaultZone:8 },
];

// Country code → default language hint
const COUNTRY_LANG_MAP = {
  US:'en',CA:'en',GB:'en',AU:'en',NZ:'en',IE:'en',
  ES:'es',MX:'es',AR:'es',CL:'es',CO:'es',PE:'es',
  FR:'fr',BE:'fr',
  DE:'de',AT:'de',CH:'de',
  BR:'pt',PT:'pt',
  JP:'ja',
  CN:'zh',
  IN:'hi',
  PK:'hi',
};

// ── i18n engine ──
let currentLang = 'en';

function t(key, fallback) {
  const entry = I18N[key];
  if (!entry) return fallback || key;
  return entry[currentLang] || entry.en || fallback || key;
}

// Translate a SPIRAL_GROUP / plant-type name
function tType(englishName) {
  const keyMap = {
    "Deciduous Tree":    "type.deciduoustree",
    "Evergreen Tree":    "type.evergreentree",
    "Deciduous Shrub":   "type.deciduousshrub",
    "Evergreen Shrub":   "type.evergreenshrub",
    "Climber / Vine":    "type.climbervine",
    "Perennial":         "type.perennial",
    "Annual / Biennial": "type.annualbiennial",
    "Bulb / Corm":       "type.bulbcorm",
    "Grass / Sedge":     "type.grasssedge",
    "Fern / Moss":       "type.fernmoss",
    "Other / Unknown":   "type.otherunknown",
  };
  const k = keyMap[englishName];
  return k ? t(k, englishName) : englishName;
}

// ── Translate a plant common name ──
// Loaded from plant_names_i18n.json (keyed by "Genus Species")
// Returns: translated name, or English name, or Latin name (italicized via flag)
let PLANT_NAMES_I18N = {};   // populated by loadPlantNamesI18n()
let _plantI18nLoaded = false;

async function loadPlantNamesI18n() {
  if (_plantI18nLoaded) return;
  try {
    const resp = await fetch('plant_names_i18n.json');
    if (resp.ok) {
      PLANT_NAMES_I18N = await resp.json();
      _plantI18nLoaded = true;
      console.log(`🌍 Plant name translations loaded: ${Object.keys(PLANT_NAMES_I18N).length} species`);
    }
  } catch(e) {
    console.warn('Plant name translations not available:', e.message);
  }
}

/**
 * Translate a plant name.
 * @param {object} plant - Row from CSV with Genus, Species, CommonName
 * @param {object} opts  - { html: true } to wrap Latin fallback in <em>
 * @returns {string} Best available name in currentLang
 */
function tPlant(plant, opts) {
  const html = opts && opts.html;
  const sciName = `${plant.Genus || ''} ${plant.Species || ''}`.trim();
  const enName  = plant.CommonName || '';

  // English or no translations loaded → return English or Latin
  if (currentLang === 'en' || !_plantI18nLoaded) {
    return enName || (html ? `<em>${sciName}</em>` : sciName);
  }

  // Check translations
  const entry = PLANT_NAMES_I18N[sciName];
  if (entry && entry[currentLang]) {
    return entry[currentLang];
  }

  // Fallback: English common name, then Latin name (italicized to signal it's scientific)
  if (enName) return enName;
  return html ? `<em>${sciName}</em>` : sciName;
}

function setLang(lang) {
  if (!I18N_LANGS.find(l => l.code === lang)) lang = 'en';
  currentLang = lang;
  try { localStorage.setItem('pltx_lang', lang); } catch(e) {}
  document.documentElement.lang = lang;
  applyTranslations();
  // Re-render charts/table with translated plant names
  if (typeof refreshAll === 'function') {
    try { refreshAll(); } catch(e) {}
  }
}

function applyTranslations() {
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translated;
    } else if (el.tagName === 'OPTION') {
      el.textContent = translated;
    } else {
      // Preserve child elements (icons etc.) — only replace text nodes
      const icon = el.querySelector('i.fas, i.fab, svg');
      if (icon && el.childNodes.length <= 3) {
        // Simple case: icon + text
        el.innerHTML = el.innerHTML.replace(/(>)[^<]*(<?)/g, (m, p1, p2, offset) => {
          // skip first match (inside icon tag)
          return m;
        });
        // Safer: just set the last text node
        const textNodes = [...el.childNodes].filter(n => n.nodeType === 3);
        if (textNodes.length) {
          textNodes[textNodes.length - 1].textContent = ' ' + translated;
        } else {
          el.appendChild(document.createTextNode(' ' + translated));
        }
      } else {
        el.textContent = translated;
      }
    }
  });

  // Translate elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });

  // Translate elements with data-i18n-title  
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });

  // Update language selector if present
  const langSel = document.getElementById('langSelect');
  if (langSel) langSel.value = currentLang;
}

function detectLang() {
  // 1. Check localStorage
  try {
    const saved = localStorage.getItem('pltx_lang');
    if (saved && I18N_LANGS.find(l => l.code === saved)) return saved;
  } catch(e) {}

  // 2. Check Cloudflare country cookie/header
  const cfCountry = getCookie('cf_country');
  if (cfCountry && COUNTRY_LANG_MAP[cfCountry]) return COUNTRY_LANG_MAP[cfCountry];

  // 3. Check browser language
  const nav = (navigator.language || 'en').split('-')[0].toLowerCase();
  if (I18N_LANGS.find(l => l.code === nav)) return nav;

  return 'en';
}

function getCookie(name) {
  const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return v ? v.pop() : '';
}

// Auto-detect on load
currentLang = detectLang();
