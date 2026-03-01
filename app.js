/* Corelink - app.js */
(function(){
  /* === BUILD EMAIL (avoid Cloudflare detection) === */
  var em = ['corelink0026','gmail','com'].join('.');
  em = em.replace('.gmail.','\x40gmail.');
  var emailLinks = document.querySelectorAll('[data-email]');
  for(var i=0;i<emailLinks.length;i++){
    emailLinks[i].href = 'mail' + 'to:' + em;
    if(emailLinks[i].querySelector('.ci-v')){
      emailLinks[i].querySelector('.ci-v').textContent = em;
    }
  }
  var mailBtns = document.querySelectorAll('[data-mailbtn]');
  for(var i=0;i<mailBtns.length;i++){
    mailBtns[i].href = 'mail' + 'to:' + em;
  }

  /* === PROFILER WHATSAPP === */
  var btn = document.getElementById('profWaBtn');
  if(btn){
    var radioMap = {
      biz:{b1:'מסחר / קמעונאות',b2:'שירותים',b3:'טכנולוגיה',b4:'מזון ואירוח',b5:'בריאות',b6:'חינוך והדרכה',b7:'נדל"ן / בנייה',b8:'אחר'},
      size:{sz1:'עצמאי',sz2:'2-5 עובדים',sz3:'6-20 עובדים',sz4:'20+ עובדים'},
      cust:{cu1:'עד 50 לקוחות',cu2:'50-200 לקוחות',cu3:'200-1,000 לקוחות',cu4:'1,000+ לקוחות'},
      leads:{ld1:'עד 20 לידים/חודש',ld2:'20-100 לידים/חודש',ld3:'100-500 לידים/חודש',ld4:'500+ לידים/חודש'},
      urg:{ur1:'דחוף - רוצה עכשיו',ur2:'בחודש-חודשיים',ur3:'בודק אפשרויות'},
      bgt:{bg1:'עד ₪500/חודש',bg2:'₪500-2,000/חודש',bg3:'₪2,000-5,000/חודש',bg4:'₪5,000+/חודש'}
    };
    var toolMap={tl1:'אקסל/שיטס',tl2:'CRM',tl3:'ווטסאפ ידני',tl4:'דיוור/מיילים',tl5:'פנקס/נייר',tl6:'אין כלים מסודרים',tl7:'Zapier/Make',tl8:'כלים אחרים'};
    var painMap={pn1:'ניהול לידים',pn2:'מעקב לקוחות',pn3:'חשבוניות ותשלומים',pn4:'תיאום פגישות',pn5:'דיווח ונתונים',pn6:'שיווק ותקשורת',pn7:'שירות לקוחות',pn8:'חיבור בין מערכות',pn9:'חוסר בזמן'};
    var labels={biz:'🏢 תחום',size:'👥 עובדים',cust:'📊 לקוחות',leads:'📥 לידים/חודש',urg:'⏰ דחיפות',bgt:'💰 תקציב'};

    function buildProfileMsg(){
      var lines=['🔔 *פרופיל עסקי חדש — Corelink*','━━━━━━━━━━━━━━━━━━',''];
      for(var name in radioMap){
        var sel=document.querySelector('input[name="'+name+'"]:checked');
        lines.push('*'+labels[name]+':* '+(sel?radioMap[name][sel.id]:'—'));
      }
      var tools=[];
      for(var k in toolMap){var el=document.getElementById(k);if(el&&el.checked)tools.push(toolMap[k])}
      lines.push('');
      lines.push('*🛠 כלים בשימוש:* '+(tools.length?tools.join(', '):'—'));
      var pains=[];
      for(var k in painMap){var el=document.getElementById(k);if(el&&el.checked)pains.push(painMap[k])}
      lines.push('');
      lines.push('*🔥 אתגרים:* '+(pains.length?pains.join(', '):'—'));
      lines.push('');
      lines.push('━━━━━━━━━━━━━━━━━━');
      lines.push('נשלח מאתר Corelink');
      return lines.join('\n');
    }

    function updateProfileHref(){
      btn.href='https://wa.me/972543256717?text='+encodeURIComponent(buildProfileMsg());
    }

    var allInputs=document.querySelectorAll('#profile input[type=radio],#profile input[type=checkbox]');
    for(var i=0;i<allInputs.length;i++){
      allInputs[i].addEventListener('change',updateProfileHref);
    }
    btn.addEventListener('click',function(){updateProfileHref()});

    var notice=document.getElementById('safariNotice');
    if(notice)notice.style.display='none';
    updateProfileHref();
  }

  /* === CONTACT FORM WHATSAPP === */
  var cfBtn=document.getElementById('cfSubmit');
  if(cfBtn){
    function updateContactHref(){
      var name=document.getElementById('cfName').value||'';
      var phone=document.getElementById('cfPhone').value||'';
      var email=document.getElementById('cfEmail').value||'';
      var company=document.getElementById('cfCompany').value||'';
      var msg=document.getElementById('cfMsg').value||'';
      var lines=['📩 *פנייה חדשה מהאתר — Corelink*','━━━━━━━━━━━━━━━━━━',''];
      if(name)lines.push('*👤 שם:* '+name);
      if(phone)lines.push('*📞 טלפון:* '+phone);
      if(email)lines.push('*📧 אימייל:* '+email);
      if(company)lines.push('*🏢 חברה:* '+company);
      if(msg){lines.push('');lines.push('*💬 הודעה:*');lines.push(msg)}
      lines.push('');
      lines.push('━━━━━━━━━━━━━━━━━━');
      lines.push('נשלח מאתר Corelink');
      cfBtn.href='https://wa.me/972543256717?text='+encodeURIComponent(lines.join('\n'));
    }

    var fields=document.querySelectorAll('#contactForm input,#contactForm textarea');
    for(var i=0;i<fields.length;i++){
      fields[i].addEventListener('input',updateContactHref);
      fields[i].addEventListener('change',updateContactHref);
    }
    cfBtn.addEventListener('click',function(){updateContactHref()});
    updateContactHref();
  }
})();
