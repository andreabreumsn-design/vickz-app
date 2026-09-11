/**
 * Report Generator Module
 * Funções de geração de laudo extraídas do index.html publicado
 * Convertidas para módulo JavaScript + adaptadas para React
 */

// Função auxiliar para gerar figura/imagem com legenda
function fig(src, leg, n, ano) {
  if (!src) return `<p><i>[inserir foto]</i></p><p>Figura ${n} - ${leg}<br>Fonte: Autor, ${ano}.</p>`;
  return `<p><img src="${src}" style="max-width:100%;max-height:400px"/></p><p>Figura ${n} - ${leg}<br>Fonte: Autor, ${ano}.</p>`;
}

// Gera HTML completo do laudo com 15 seções
function htmlPrint(lista, titulo, dataGeral) {
  const g = dataGeral || {};
  const dt = new Date();
  const MESES = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'];
  const ano = dt.getFullYear(), mes = MESES[dt.getMonth()];
  const dataBR = dt.toLocaleDateString('pt-BR');
  const dataExt = dt.getDate() + ' de ' + mes.toLowerCase() + ' de ' + ano;
  const endObra = [g.rua, g.num, g.comp, g.bairro, g.cid, g.uf, g.cep].filter(Boolean).join(', ');
  const vol = '01/0' + Math.max(lista.length, 1);

  const blocos = lista.map((im, ix) => {
    const a1 = im.a1 || {};
    const endViz = a1.end || im.end || '';
    const decl = a1.decl || im.nome || '';
    const fs = im.fotos || [];
    const fach = im.fachada || (fs[0] && (fs[0].marked || fs[0].url)) || '';
    let n = 1;

    const ficha = `
      <p style="text-align:center"><img src="vickz_logo.png" style="height:52px"/><br>Engenharia</p>
      <p style="text-align:center">Incorporadora — ${g.const||'—'}</p>
      <h1 style="text-align:center">LAUDO DE VISTORIA CAUTELAR DE VIZINHANÇA</h1>
      <p><b>CONTRATANTE:</b> ${g.const||'—'}<br>
      <b>EMPREENDIMENTO:</b> ${g.obra||'—'}<br>
      <b>ENDEREÇO EMPREENDIMENTO:</b> ${endObra||'—'}<br>
      <b>EDIFICAÇÃO VISTORIADA:</b> ${endViz||'—'}<br>
      <b>RESPONSÁVEL TÉCNICO:</b> ${g.prof||'—'}<br>
      <b>VOLUME:</b> ${vol.replace('0'+Math.max(lista.length,1), String(ix+1).padStart(2,'0')+'/'+String(lista.length).padStart(2,'0'))}</p>
      ${fig(fach,'Foto da edificação vistoriada',n++,ano)}
      <p style="text-align:center"><b>${mes} DE ${ano}</b></p>
      <h2>Sumário</h2>
      <p>1 – Apresentação<br>2 – Objetivos<br>3 – Dados Técnicos<br>4 – Considerações preliminares<br>5 – Foto aérea<br>6 – Caracterização do Terreno<br>7 – Fachadas<br>8 – Área externa<br>9 – Área Interna<br>10 – Recomendações<br>11 – Considerações finais<br>12 – Anexo 01 – Planilha de patologias<br>13 – Anexo 02 – Autorização e acompanhamento da vistoria<br>14 – Anexo 03 – Conversas<br>15 – Anexo 04 – Anotação de Responsabilidade Técnica - ART</p>
      <h2>Lista de Ilustrações</h2>
      <p>Atualize esta lista automaticamente pelo Word (Referências > Inserir Legenda / Índice de Ilustrações) após inserir as fotos definitivas.</p>
      <h2>1 – Apresentação</h2>
      <p>A vistoria cautelar é a constatação das condições de uma edificação, mediante verificação "in loco", com registros fotográficos e descrição técnica das edificações lindeiras ao terreno do novo empreendimento. Tem como objetivo resguardar o cliente com base em prova documental, de futuros problemas com a vizinhança.</p>
      <p>Toda obra de construção civil deve estar precavida em relação aos imóveis vizinhos. Na hipótese de ocorrência de danos, com base no laudo elaborado, verifica-se se existe responsabilidade da construtora, comprovando ou não a preexistência de anomalias nas edificações vistoriadas.</p>
      <p>Caso seja comprovado pelos registros do laudo que as patologias foram causadas em decorrência da execução da obra, cabe ao construtor sanar o problema, de preferência amigavelmente, para manter um bom relacionamento com a vizinhança.</p>
      <p>O estudo apresentado é baseado na análise dos dados coletados, resultando na identificação do estado do imóvel até o presente momento. O laudo atua tanto na esfera judicial quanto na extrajudicial, contribuindo para apaziguar desentendimentos e identificar a responsabilidade das partes.</p>
      <h2>2 – Objetivos</h2>
      <h3>2.1 – Objetivo Geral</h3>
      <p>Este laudo tem como objetivo principal uma análise detalhada de possíveis patologias existentes na edificação residencial/comercial situada do futuro empreendimento ${g.obra||'—'}, localizado em ${endObra||'—'}.</p>
      <h3>2.2 – Objetivos Específicos</h3>
      <ul><li>Comunicação ao proprietário da edificação lindeira ao futuro empreendimento sobre a vistoria a ser elaborada;</li>
      <li>Elaboração de relatório fotográfico da edificação;</li>
      <li>Apontar as patologias existentes.</li></ul>
      <h2>3 – Dados Técnicos</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><td><b>Parâmetro</b></td><td><b>Descrição</b></td></tr>
        <tr><td>Contratante</td><td>${g.const||'—'}</td></tr>
        <tr><td>Data da vistoria</td><td>${a1.data||dataBR}</td></tr>
        <tr><td>Endereço</td><td>${endViz||'—'}</td></tr>
        <tr><td>Bairro</td><td>${g.bairro||'—'}</td></tr>
        <tr><td>Cidade</td><td>${(a1.mun||g.cid)||'—'} / ${(a1.uf||g.uf)||''}</td></tr>
        <tr><td>Tipo de ocupação</td><td>—</td></tr>
        <tr><td>Número de pavimentos</td><td>—</td></tr>
        <tr><td>Idade aparente</td><td>—</td></tr>
        <tr><td>Estado da edificação</td><td>—</td></tr>
        <tr><td>Responsável técnico</td><td>${g.prof||'—'} ${g.crea||''}</td></tr>
      </table>
      <h2>4 – Considerações preliminares</h2>
      <p>A edificação é composta por pavimento(s), sendo a estrutura, paredes de vedação e argamassa com pintura conforme verificado in loco.</p>
      <p>Com a vistoria realizada na residência em estudo, foi possível perceber o estado geral registrado nas fotografias. O imóvel encontra-se nas condições descritas neste laudo e na planilha de patologias.</p>
      <p>A vistoria técnica foi realizada no dia ${a1.data||dataExt}, pelo(a) ${g.prof||'—'}, acompanhado(a) pelo(a) Sr(a). ${decl||'—'}, que se identificou como ${a1.qual||'responsável'} do imóvel.</p>
      <p>Para facilitar a visualização e noção de grandeza das anomalias nas imagens, foram utilizadas setas vermelhas, conforme figura abaixo. Além disso, serão anexadas ao laudo planilhas de referência das patologias, para auxiliar na busca.</p>
      <p>➔</p>
      <p>Figura ${n++} - Sinalizador de patologia.<br>Fonte: Autor, ${ano}.</p>
      <p>Fissuras, trincas e rachaduras são manifestações patológicas das edificações observadas em alvenarias, vigas, pilares, lajes, pisos, entre outros elementos. As aberturas das patologias foram consideradas conforme a tabela abaixo:</p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><td><b>Patologia</b></td><td><b>Abertura (mm)</b></td></tr>
        <tr><td>Fissura</td><td>Até 0,5</td></tr>
        <tr><td>Trinca</td><td>De 0,5 a 1,5</td></tr>
        <tr><td>Rachadura</td><td>De 1,5 a 5</td></tr>
        <tr><td>Fenda</td><td>De 5 a 10</td></tr>
        <tr><td>Brecha</td><td>Acima de 10</td></tr>
      </table>
      <p>Fonte: NBR 9575.</p>
      <h2>5 – Foto aérea</h2>
      <p>Na foto abaixo, identifica-se em vermelho a edificação vistoriada e em azul o terreno onde será construído o futuro empreendimento ${g.obra||'—'}.</p>
      <p>Coordenadas do empreendimento: ${g.lat||'—'}, ${g.lng||'—'}.</p>
      ${fig(fach,'Locação aérea do imóvel',n++,ano)}
      <h2>6 – Caracterização do Terreno</h2>
      <p>Trata-se do terreno do empreendimento ${g.obra||'—'}, ${endObra}, matrícula(s): ${g.mat||'—'}.</p>
      <p>Seguem abaixo imagens do terreno onde será implantado o referido empreendimento.</p>
      ${fig(fach,'Localização do terreno do futuro empreendimento.',n++,ano)}
      ${fig(fach,'Vista geral do futuro empreendimento.',n++,ano)}
      <h2>7 – Fachadas</h2>
      <p>O objetivo da vistoria externa é apontar as patologias encontradas nas fachadas da edificação vistoriada e muros de divisa.</p>
      ${fig(fach,'Vista geral, fachada.',n++,ano)}
      <h2>8 – Área externa</h2>
      <p>O objetivo da vistoria externa é apontar as patologias encontradas nos muros de divisa, calçadas e circulação externa da edificação vistoriada.</p>
      ${fs.filter(f=>/extern|muro|calcad|fachad|telhad/i.test((f.amb||'')+' '+(f.pat||''))).map(f=>fig(f.marked||f.url,'Vista geral, área externa, '+(f.amb||'')+(f.pat?'; patologia: '+f.pat:''),n++,ano)).join('')
        || fig(fs[0]&&(fs[0].marked||fs[0].url),'Vista geral, área externa.',n++,ano)}
      <h2>9 – Área Interna</h2>
      <p>O objetivo da vistoria interna é apontar as patologias encontradas nos cômodos da edificação vistoriada.</p>
      ${fs.map(f=>fig(f.marked||f.url,'Área interna, '+(f.amb||'cômodo')+(f.pat?', patologia '+f.pat:''),n++,ano)).join('')||'<p>Sem registro interno nesta sessão.</p>'}
      <h2>10 – Recomendações</h2>
      <p>Conforme se infere do arquivo fotográfico realizado na data da vistoria, recomenda-se que o imóvel seja objeto de análise e monitoramento, a critério do corpo técnico da obra ou em caso de necessidade, para direcionamento e determinação das condições de tomada de providências técnicas e preventivas.</p>
      <h2>11 – Considerações finais</h2>
      <p>Este trabalho trata-se de um Laudo de Vistoria Cautelar de Vizinhança, o qual foi realizado na edificação situada junto ao futuro empreendimento, a ser executado pela ${g.const||'—' }.</p>
      <p>A inspeção foi realizada pelo(a) ${g.prof||'—'}, contendo o presente volume.</p>
      <p>Será fornecida ao contratante uma cópia do laudo, juntamente com os arquivos digitais contendo o laudo em PDF e todas as imagens registradas na vistoria, que servem como documento comprobatório do estado da edificação vistoriada antes do início do futuro empreendimento.</p>
      <p>${g.cid||'—'}, ${dataExt}.</p>
      <p>Doc. assinado digitalmente.</p>
      ${im.sigProf?`<p><img src="${im.sigProf}" style="max-width:220px"/></p>`:''}
      <p><b>${g.prof||'—'}</b><br>${g.conselho||'CREA/CAU'} ${g.crea||''}</p>
      ${im.sig?`<p>Acompanhante / declarante: ${decl}<br><img src="${im.sig}" style="max-width:220px"/></p>`:''}
      <h2>12 – Anexo 01 – Planilha de patologias</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><td><b>Nº</b></td><td><b>Ambiente</b></td><td><b>Tipo de Patologia</b></td></tr>
        ${fs.filter(f=>f.pat).map((f,i)=>`<tr><td>${i+1}</td><td>${f.amb||''}</td><td>${f.pat}</td></tr>`).join('')
          || '<tr><td>—</td><td>—</td><td>Nenhuma patologia descrita nesta sessão.</td></tr>'}
      </table>
      <p>Referência de tipos (modelo): Abertura entre parede e pilar; Diversas fissuras; Trinca no pilar; Microfissuras; Abertura entre paredes; Fissura; Piso cedendo; Rachadura; Trincas; Revestimento cerâmico solto; Piso quebrado; Pintura desbotando; Falta de impermeabilização; Piso trincado; Infiltração; Rejunte solto; Ferrugem no piso; Parede perfurada; Desagregação; Eflorescência; Saponificação; Mofo; Furo na parede; Batente perfurado/trincado; Falta de vedação em calha.</p>
      <h2>13 – Anexo 02 – Autorização e acompanhamento da vistoria</h2>
      <p>Contratante: ${g.const||'—'} · Empreendimento: ${g.obra||'—'} · Edificação vistoriada: ${endViz||'—'} · Vistoriador: ${g.prof||'—'} · Acompanhado por: ${decl||'—'} · Local e data: ${g.cid||''}, ${a1.data||dataBR}.</p>
      ${im.sig||im.sigProf?`<p>${im.sig?`<img src="${im.sig}" style="max-width:200px"/> `:''}${im.sigProf?`<img src="${im.sigProf}" style="max-width:200px"/>`:''}</p>`:''}
      <h2>14 – Anexo 03 – Conversas</h2>
      <p>${g.convList||'Inserir prints das conversas (WhatsApp/e-mail) de agendamento anexados no app.'}</p>
      <h2>15 – Anexo 04 – Anotação de Responsabilidade Técnica - ART</h2>
      <p>${g.artList||'Inserir a ART/RRT digital do serviço, quitada e vinculada ao CREA/CAU do responsável técnico.'}</p>
    `;
    return `<article style="page-break-after:always">${ficha}</article>`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${titulo}</title>
  <style>body{font-family:Segoe UI,sans-serif;color:#001F5B;max-width:800px;margin:24px auto;line-height:1.45}
  img.logo{height:56px} h1,h2,h3{color:#001F5B} @media print { .noprint{display:none} }</style></head><body>
  ${blocos}
  <p class="noprint"><button onclick="window.print()">Imprimir / salvar PDF</button></p>
  </body></html>`;
}

// Exporta para .doc (Word)
function baixarWord(html, nome) {
  const blob = new Blob(['﻿' + html], {type: 'application/msword'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nome.endsWith('.doc') ? nome : nome + '.doc';
  a.click();
}

// Abre relatório em nova aba (PDF) ou baixa como Word
function abrirRelatorio(lista, titulo, fmt, dataGeral) {
  const html = htmlPrint(lista, titulo, dataGeral);
  const nome = (titulo || 'Laudo-VICKZ').replace(/\s+/g, '-');

  if (fmt === 'word') {
    baixarWord(html, nome + '.doc');
    return;
  }

  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  let w = null;

  try {
    w = window.open(url, '_blank');
  } catch (e) {
    w = null;
  }

  if (!w) {
    const a = document.createElement('a');
    a.href = url;
    a.download = nome + '.html';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

// Gera relatório de um imóvel específico
function relatorioImovel(imovel, index, fmt, dataGeral) {
  abrirRelatorio([imovel], `Relatorio-VICKZ-imovel-${index + 1}`, fmt || 'pdf', dataGeral);
}

// Gera relatório completo de todos os imóveis
function relatorioIntegral(imoveis, fmt, dataGeral) {
  abrirRelatorio(imoveis, 'Relatorio-integral-VICKZ', fmt || 'pdf', dataGeral);
}

export {
  htmlPrint,
  baixarWord,
  abrirRelatorio,
  relatorioImovel,
  relatorioIntegral,
  fig
};
